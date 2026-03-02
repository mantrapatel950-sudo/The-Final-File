
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
import SettingsView from './views/SettingsView';
import SubscriptionView from './views/SubscriptionView';
import { Layout } from './components/Layout';
import { ShieldCheck, Landmark, Users, Zap, CheckCircle2, Lock, Smartphone, HeartPulse, Loader2, Sparkles, ChevronRight, Globe, Fingerprint, ShieldAlert, FileText, Cpu, Hexagon } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('login');
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
    
    const savedTheme = localStorage.getItem('mff_theme');
    if (savedTheme) setTheme(savedTheme as 'dark' | 'light');

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const handleLogin = () => {
    setView('dashboard');
  };

  const BrandLogo = ({ className = "w-24 h-24" }: { className?: string }) => (
    <div className={`relative ${className} group`}>
      <div className="absolute inset-0 bg-yellow-500/30 blur-[40px] rounded-full group-hover:bg-yellow-500/50 transition-all duration-1000 animate-pulse"></div>
      {/* Replace the src below with the URL of your uploaded image */}
      <img 
        src="https://picsum.photos/seed/vaultlogo/400/400" 
        alt="My Final File Logo" 
        className="w-full h-full relative z-10 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-700 group-hover:scale-110 rounded-full"
        referrerPolicy="no-referrer"
      />
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
      
      <div className="relative flex flex-col items-center max-w-lg w-full px-6 md:px-12 stagger-in">
        <BrandLogo className="w-32 h-32 md:w-56 md:h-56 mb-8 md:mb-16 animate-float" />
        
        <div className="w-full space-y-6 md:space-y-10 text-center">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-6xl font-black gold-text uppercase tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
              MY FINAL FILE
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="h-px w-4 md:w-8 bg-slate-800"></div>
              <p className="text-slate-500 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] animate-pulse">
                Establishing Quantum Secure Link
              </p>
              <div className="h-px w-4 md:w-8 bg-slate-800"></div>
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

  const renderView = () => {
    if (showSplash) return <SplashScreen />;

    switch (view) {
      case 'login':
        return <Login lang={lang} t={t} onLogin={handleLogin} onBack={() => {}} />;

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
            {view === 'subscription' && <SubscriptionView t={t} />}
            {view === 'settings' && <SettingsView lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />}
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
