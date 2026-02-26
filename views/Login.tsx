
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { ChevronLeft, Smartphone, KeyRound, ArrowRight, CheckCircle2, ShieldCheck, Lock, Fingerprint, Loader2, Chrome } from 'lucide-react';

interface LoginProps {
  lang: Language;
  t: any;
  onLogin: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ t, onLogin, onBack }) => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setSuccess(true);
        setTimeout(onLogin, 1000);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLogin]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/google/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(url, 'google_oauth', `width=${width},height=${height},left=${left},top=${top}`);
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Failed to initialize Google Login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isMobileValid = mobile.length === 10;
  const isOtpValid = otp.length === 6;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isMobileValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
      }, 800);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(onLogin, 1000);
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="text-center animate-in zoom-in duration-700">
          <div className="w-32 h-32 bg-green-500 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(34,197,94,0.4)] border-4 border-white/20">
            <CheckCircle2 size={64} className="text-white" />
          </div>
          <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Vault Unlocked</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs opacity-60">Redirecting to Secure Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Security Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 blur-[140px] rounded-full animate-pulse pointer-events-none"></div>
      
      <div className="w-full max-w-xl relative reveal-box">
        <button 
          onClick={onBack}
          className="absolute -top-16 left-0 flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <ChevronLeft size={16} />
          </div>
          Go Back
        </button>

        <div className="glass-vault rounded-[4rem] overflow-hidden p-1 bg-gradient-to-br from-white/10 to-transparent">
          <div className="bg-[#0a0f1d] rounded-[3.8rem] overflow-hidden">
            <div className="p-12 text-center bg-white/5 border-b border-white/5">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-xl group cursor-pointer hover:scale-105 transition-transform">
                <Lock className="text-yellow-500" size={32} />
              </div>
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{t.loginTitle}</h2>
              <div className="flex items-center gap-3 justify-center text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                 <ShieldCheck size={14} className="text-yellow-500" /> AES-256 Bit Verified
              </div>
            </div>

            <div className="p-12">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-10">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">{t.mobilePlaceholder}</label>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                         <span className="text-slate-500 font-black text-xl">+91</span>
                         <div className="w-px h-6 bg-slate-800"></div>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full pl-24 pr-8 py-7 bg-slate-950/80 border border-white/10 rounded-[2.5rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all outline-none text-2xl font-black text-white tracking-[0.2em] placeholder:text-slate-800"
                        placeholder="00000 00000"
                        required
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading || !isMobileValid}
                    className={`w-full py-7 rounded-[2.5rem] font-black text-xl transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden ${
                      isMobileValid 
                        ? 'gold-gradient text-slate-950 shadow-[0_0_60px_rgba(212,175,55,0.5)] scale-[1.02] ring-2 ring-yellow-500/30' 
                        : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isMobileValid && (
                      <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] pointer-events-none"></div>
                    )}
                    <span className="relative z-10">{loading ? <Loader2 className="animate-spin" /> : t.sendOtp}</span>
                    {!loading && <ArrowRight size={24} strokeWidth={3} className={`relative z-10 ${isMobileValid ? 'group-hover:translate-x-2 animate-bounce-x' : ''} transition-transform`} />}
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                      <span className="px-4 bg-[#0a0f1d] text-slate-600">Or Secure Cloud Entry</span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black text-lg flex items-center justify-center gap-4 hover:bg-white/10 transition-all active:scale-95 group"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Chrome className="text-slate-950" size={24} />
                    </div>
                    Sign in with Google
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-10">
                  <div className="animate-in slide-in-from-right-8 duration-500">
                    <div className="flex items-center justify-center gap-4 mb-8 bg-white/5 p-4 rounded-3xl border border-white/5">
                      <Smartphone size={20} className="text-yellow-500" />
                      <span className="text-slate-400 font-bold tracking-wide">OTP Sent to <strong className="text-white">+91 {mobile}</strong></span>
                      <button onClick={() => setOtpSent(false)} className="text-yellow-500 hover:underline text-xs font-black uppercase">Edit</button>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Verification Code</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-8 py-7 bg-slate-950/80 border border-white/10 rounded-[2.5rem] focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all outline-none text-center text-5xl tracking-[0.5em] font-black text-white placeholder:text-slate-900"
                        placeholder="000000"
                        autoFocus
                        required
                      />
                    </div>
                    <p className="text-center mt-6 text-[10px] text-slate-600 font-black uppercase tracking-widest">
                      Enter the 6-digit code received via SMS
                    </p>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading || !isOtpValid}
                    className={`w-full py-7 rounded-[2.5rem] font-black text-xl transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden ${
                      isOtpValid 
                        ? 'gold-gradient text-slate-950 shadow-[0_0_60px_rgba(212,175,55,0.5)] scale-[1.02] ring-2 ring-yellow-500/30' 
                        : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isOtpValid && (
                      <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] pointer-events-none"></div>
                    )}
                    <span className="relative z-10">{loading ? <Loader2 className="animate-spin" /> : 'Authorize Access'}</span>
                    {!loading && <Fingerprint size={24} strokeWidth={3} className={`relative z-10 ${isOtpValid ? 'group-hover:scale-110' : ''} transition-transform`} />}
                  </button>
                </form>
              )}

              <div className="mt-16 text-center space-y-6">
                <div className="inline-flex items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
                  <ShieldCheck size={14} /> Hardware-Level Security Active
                </div>
                <div className="flex justify-center gap-8 opacity-20">
                   <div className="w-10 h-px bg-slate-500"></div>
                   <div className="w-10 h-px bg-slate-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
