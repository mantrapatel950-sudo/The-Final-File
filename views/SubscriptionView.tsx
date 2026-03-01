import React, { useState } from 'react';
import { CreditCard, Bitcoin, ShieldCheck, CheckCircle2, ArrowRight, Wallet, Smartphone, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface SubscriptionViewProps {
  t: any;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ t }) => {
  const [selectedMethod, setSelectedMethod] = useState<'crypto' | 'upi' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');

  const upiId = "mantra69@pthdfc";
  const upiUrl = `upi://pay?pa=${upiId}&pn=MyFinalFile&am=799.00&cu=INR`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-slate-900 border border-yellow-500/20 rounded-2xl text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
        <p className="text-slate-400 mb-8">Your My Final File vault is now secured with Premium features for the next 1 year.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Secure Your Legacy</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Upgrade to Premium to unlock advanced vault protection, unlimited assets, and priority nominee verification.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Details */}
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">Premium Vault</h3>
              <p className="text-slate-400 text-sm">Billed annually</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-500">₹799</div>
              <p className="text-slate-500 text-sm">/ year</p>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          <ul className="space-y-4">
            {[
              "Unlimited Asset Registration",
              "Advanced Nominee Verification",
              "Quantum Secure Encryption",
              "Priority Customer Concierge",
              "Automated Emergency Triggers"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Select Payment Method</h3>
          
          <div className="space-y-4">
            {/* UPI / Razorpay */}
            <div className={`w-full rounded-xl border transition-all overflow-hidden ${
              selectedMethod === 'upi' 
                ? 'bg-yellow-500/5 border-yellow-500' 
                : 'bg-slate-900 border-white/5 hover:border-white/20'
            }`}>
              <button
                onClick={() => setSelectedMethod('upi')}
                className="w-full flex items-center justify-between p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">UPI / Razorpay</div>
                    <div className="text-sm text-slate-400">Google Pay, PhonePe, Paytm</div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'upi' ? 'border-yellow-500' : 'border-slate-600'
                }`}>
                  {selectedMethod === 'upi' && <div className="w-3 h-3 bg-yellow-500 rounded-full" />}
                </div>
              </button>
              
              {selectedMethod === 'upi' && (
                <div className="p-5 border-t border-yellow-500/20 bg-slate-950/50 flex flex-col items-center justify-center space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-xl">
                    <QRCodeSVG value={upiUrl} size={150} level="H" />
                  </div>
                  <p className="text-sm text-slate-400 text-center">Scan with any UPI app to pay ₹799</p>
                  
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-white/10 w-full max-w-xs">
                    <span className="text-slate-300 flex-1 font-mono text-sm truncate">{upiId}</span>
                    <button 
                      onClick={handleCopyUpi}
                      className="text-yellow-500 hover:text-yellow-400 p-1 rounded transition-colors"
                      title="Copy UPI ID"
                    >
                      {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  {copied && <span className="text-xs text-green-500">UPI ID Copied!</span>}

                  <div className="w-full max-w-xs mt-2">
                    <label className="block text-xs text-slate-400 mb-1">Transaction ID (UTR)</label>
                    <input 
                      type="text" 
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="Enter 12-digit UTR number" 
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Crypto */}
            <button
              onClick={() => setSelectedMethod('crypto')}
              className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all ${
                selectedMethod === 'crypto' 
                  ? 'bg-yellow-500/10 border-yellow-500' 
                  : 'bg-slate-900 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Cryptocurrency</div>
                  <div className="text-sm text-slate-400">Bitcoin, USDT, Solana, etc.</div>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === 'crypto' ? 'border-yellow-500' : 'border-slate-600'
              }`}>
                {selectedMethod === 'crypto' && <div className="w-3 h-3 bg-yellow-500 rounded-full" />}
              </div>
            </button>
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing || (selectedMethod === 'upi' && utrNumber.length < 12)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              !selectedMethod || isProcessing || (selectedMethod === 'upi' && utrNumber.length < 12)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400'
            }`}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Pay ₹799 Securely
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
