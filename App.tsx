
import React, { useState, useEffect } from 'react';
import { View, Language, Asset, Nominee, EmergencyRule } from './types';
import { translations } from './translations';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AssetsView from './views/AssetsView';
import NomineesView from './views/NomineesView';
import EmergencyView from './views/EmergencyView';
import MarketingLegalView from './views/MarketingLegalView';
import SupportView from './views/SupportView';
import { Layout } from './components/Layout';
import { ShieldCheck, Landmark, Users, Zap, CheckCircle2, Lock, Smartphone, HeartPulse, Loader2, Sparkles, ChevronRight, Globe, Fingerprint, ShieldAlert, FileText, Cpu, Hexagon } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('language');
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [emergencyRule, setEmergencyRule] = useState<EmergencyRule>({
    inactivityDays: 30,
    requireDeathProof: true
  });

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    const savedLang = localStorage.getItem('mff_lang');
    if (savedLang) setLang(savedLang as Language);

    return () => clearTimeout(timer);
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    localStorage.setItem('mff_lang', selectedLang);
    setView('login');
  };

  const handleLogin = () => {
    setView('dashboard');
  };

  const BrandLogo = ({ className = "w-24 h-24" }: { className?: string }) => (
    <div className={`relative ${className} group`}>
      <div className="absolute inset-0 bg-yellow-500/30 blur-[40px] rounded-full group-hover:bg-yellow-500/50 transition-all duration-1000 animate-pulse"></div>
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-700 group-hover:scale-110">
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#f1e5ac', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#d4af37', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#b8860b', stopOpacity: 1}} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Outer Hexagon Shield */}
        <path d="M50 5 L88 27 V73 L50 95 L12 73 V27 Z" fill="none" stroke="url(#logoGold)" strokeWidth="4" filter="url(#glow)" />
        {/* Inner Shield */}
        <path d="M50 15 L78 32 V68 L50 85 L22 68 V32 Z" fill="url(#logoGold)" className="opacity-10" />
        {/* Vault Door Handle / Document Lock */}
        <circle cx="50" cy="50" r="18" fill="none" stroke="url(#logoGold)" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="42" y="42" width="16" height="16" rx="2" fill="url(#logoGold)" />
        <path d="M47 50 L53 50 M50 47 L50 53" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );

  const SplashScreen = () => (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience - CSS only */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-yellow-500/[0.03] blur-[250px] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-80"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="relative flex flex-col items-center max-w-lg w-full px-12 stagger-in">
        <BrandLogo className="w-56 h-56 mb-16 animate-float" />
        
        <div className="w-full space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black gold-text uppercase tracking-[0.4em] drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
              MY FINAL FILE
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-slate-800"></div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
                Establishing Quantum Secure Link
              </p>
              <div className="h-px w-8 bg-slate-800"></div>
            </div>
          </div>

          <div className="relative h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-full animate-loading-bar"></div>
          </div>

          <div className="flex items-center justify-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
            <Cpu size={14} className="text-yellow-500 animate-spin-slow" />
            <span>Vault Hardware Verified • ISO 27001</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(20%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const LanguagePortal = () => (
    <div className="min-h-screen relative bg-[#020617] flex flex-col items-center overflow-hidden p-6 md:p-12">
      {/* Background Depth Pattern - CSS only */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Identity Reveal */}
      <div className="relative z-20 mb-20 md:mb-32 reveal-box flex flex-col items-center text-center">
        <BrandLogo className="w-24 h-24 mb-10" />
        <h2 className="text-white text-[12px] font-black uppercase tracking-[0.6em] mb-4 opacity-50">Authorized Legacy Management</h2>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      </div>

      {/* Main Portals */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center space-y-4 mb-20 reveal-box" style={{animationDelay: '0.4s'}}>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Secure Your <br/> <span className="gold-text">Succession</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Choose your primary language to initialize the digital asset vault.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* English Vault Portal */}
          <button 
            onClick={() => handleLangSelect('en')}
            className="group relative h-[500px] md:h-[600px] rounded-[4rem] p-1 overflow-hidden transition-all duration-700 hover:scale-[1.03] active:scale-95 portal-glow-en reveal-box shadow-2xl"
            style={{animationDelay: '0.6s'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-all duration-700"></div>
            <div className="relative h-full w-full bg-slate-900/80 backdrop-blur-3xl border border-white/5 rounded-[3.8rem] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
               {/* Background Icon Detail */}
               <div className="absolute top-0 right-0 p-10 opacity-5 -translate-y-8 translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000">
                  <Globe size={400} strokeWidth={0.5} />
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-500/10 text-blue-400 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-2xl shadow-blue-500/20">
                    <Globe size={44} />
                  </div>
                  <h3 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">ENGLISH</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-wide mb-12 opacity-70 leading-relaxed">
                    Access India's standard financial vault <br/> with international security protocols.
                  </p>
                  
                  <div className="flex items-center gap-4 py-4 px-10 bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/30 transition-all group-hover:bg-white/10">
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-blue-400 transition-colors">Enter Interface</span>
                     <ChevronRight size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
               </div>
            </div>
          </button>

          {/* Hindi Vault Portal */}
          <button 
            onClick={() => handleLangSelect('hi')}
            className="group relative h-[500px] md:h-[600px] rounded-[4rem] p-1 overflow-hidden transition-all duration-700 hover:scale-[1.03] active:scale-95 portal-glow-hi reveal-box shadow-2xl"
            style={{animationDelay: '0.8s'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent group-hover:from-yellow-500/20 transition-all duration-700"></div>
            <div className="relative h-full w-full bg-slate-900/80 backdrop-blur-3xl border border-white/5 rounded-[3.8rem] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
               {/* Background Icon Detail */}
               <div className="absolute top-0 left-0 p-10 opacity-5 -translate-y-8 -translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000">
                  <ShieldCheck size={400} strokeWidth={0.5} />
               </div>

               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 bg-yellow-500/10 text-yellow-500 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-yellow-500 group-hover:text-slate-950 group-hover:scale-110 shadow-2xl shadow-yellow-500/20">
                    <span className="text-5xl font-black leading-none">हिं</span>
                  </div>
                  <h3 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">हिंदी</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-wide mb-12 opacity-70 leading-relaxed">
                    अपनी विरासत को सुरक्षित करें। <br/> सरल, स्थानीय और पूरी तरह सुरक्षित।
                  </p>
                  
                  <div className="flex items-center gap-4 py-4 px-10 bg-yellow-500/10 rounded-full border border-yellow-500/20 group-hover:border-yellow-500 group-hover:bg-yellow-500/20 transition-all">
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-500">वॉल्ट खोलें</span>
                     <ChevronRight size={18} className="text-yellow-500" />
                  </div>
               </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-32 reveal-box flex flex-col items-center gap-10" style={{animationDelay: '1.2s'}}>
         <div className="flex items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            <div className="flex flex-col items-center gap-2">
               <Lock size={20} className="text-yellow-500" />
               <span className="text-[8px] font-black uppercase tracking-widest">AES-256</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <Smartphone size={20} className="text-blue-500" />
               <span className="text-[8px] font-black uppercase tracking-widest">2FA READY</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <Fingerprint size={20} className="text-emerald-500" />
               <span className="text-[8px] font-black uppercase tracking-widest">KYC LINK</span>
            </div>
         </div>
         <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.6em]">
           Engineered in India for Global Peace of Mind
         </p>
      </div>
    </div>
  );

  const renderView = () => {
    if (showSplash) return <SplashScreen />;

    switch (view) {
      case 'language':
        return <LanguagePortal />;

      case 'login':
        return <Login lang={lang} t={t} onLogin={handleLogin} onBack={() => setView('language')} />;

      default:
        return (
          <Layout 
            t={t} 
            currentView={view} 
            setView={setView} 
            lang={lang} 
            setLang={setLang}
          >
            {view === 'dashboard' && <Dashboard assets={assets} nominees={nominees} t={t} setView={setView} lang={lang} />}
            {view === 'assets' && <AssetsView assets={assets} setAssets={setAssets} t={t} lang={lang} />}
            {view === 'nominees' && <NomineesView nominees={nominees} setNominees={setNominees} t={t} lang={lang} />}
            {view === 'emergency' && <EmergencyView rule={emergencyRule} setRule={setEmergencyRule} t={t} />}
            {view === 'kit' && <MarketingLegalView t={t} lang={lang} />}
            {view === 'support' && <SupportView t={t} />}
          </Layout>
        );
    }
  };

  return (
    <div className="antialiased selection:bg-yellow-500/30">
      {renderView()}
    </div>
  );
};

export default App;
