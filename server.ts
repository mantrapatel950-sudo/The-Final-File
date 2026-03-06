import express from "express";
import { createServer as createViteServer } from "vite";
import { OAuth2Client } from "google-auth-library";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import twilio from "twilio";
import Stripe from "stripe";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// Stripe Setup
let stripeClient: Stripe | null = null;
const getStripe = () => {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) {
      try {
        stripeClient = new Stripe(key);
      } catch (error) {
        console.error("Failed to initialize Stripe client:", error);
        return null;
      }
    }
  }
  return stripeClient;
};

// API route to test server
app.get("/api/test", (req, res) => {
  res.json({ status: "server is running" });
});

// API route to create Stripe checkout session
app.post("/api/create-checkout-session", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured." });
  }

  try {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.headers.host;
    const domainUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Premium Vault Subscription",
              description: "1 Year of Premium Vault Protection",
            },
            unit_amount: 79900, // 799 INR in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domainUrl}/?payment=success`,
      cancel_url: `${domainUrl}/?payment=cancel`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
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
