import express from "express";
import { createServer as createViteServer } from "vite";
import { OAuth2Client } from "google-auth-library";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// Twilio Setup
let twilioClient: twilio.Twilio | null = null;
const getTwilioClient = () => {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (accountSid && authToken) {
      twilioClient = twilio(accountSid, authToken);
    }
  }
  return twilioClient;
};

// In-memory OTP store for demo purposes
const otpStore = new Map<string, { otp: string, expiresAt: number }>();

// API route to send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 mins expiry

  const tClient = getTwilioClient();
  if (tClient && process.env.TWILIO_PHONE_NUMBER) {
    try {
      await tClient.messages.create({
        body: `Your My Final File secure vault OTP is ${otp}. Do not share this with anyone.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${mobile}`
      });
      console.log(`Sent OTP ${otp} to +91${mobile} via Twilio`);
      return res.json({ success: true, message: "OTP sent successfully" });
    } catch (error: any) {
      console.error("Twilio error:", error);
      return res.status(500).json({ error: "Failed to send OTP via SMS. Please check Twilio configuration." });
    }
  } else {
    // Fallback for demo if Twilio is not configured
    console.log(`[MOCK SMS] OTP for +91${mobile} is ${otp}`);
    return res.json({ success: true, message: "Mock OTP sent (check server console)", mock: true });
  }
});

// API route to verify OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  const storedData = otpStore.get(mobile);

  if (!storedData) {
    return res.status(400).json({ error: "OTP not requested or expired" });
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(mobile);
    return res.status(400).json({ error: "OTP expired" });
  }

  if (storedData.otp === otp) {
    otpStore.delete(mobile);
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

// Helper to get redirect URI
const getRedirectUri = (req: express.Request) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers.host;
  return `${protocol}://${host}/auth/google/callback`;
};

// API route to get Google Auth URL
app.get("/api/auth/google/url", (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: "Google Client ID not configured" });
  }

  const redirectUri = getRedirectUri(req);
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
    redirect_uri: redirectUri,
  });

  res.json({ url });
});

// Google OAuth Callback
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const redirectUri = getRedirectUri(req);

  try {
    const { tokens } = await client.getToken({
      code: code as string,
      redirect_uri: redirectUri,
    });

    // In a real app, you'd verify the ID token and create a session
    // For this demo, we'll just send a success message
    
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', tokens: ${JSON.stringify(tokens)} }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Authentication failed");
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
