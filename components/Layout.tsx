
import React from 'react';
import { View, Language } from '../types';
import { LayoutDashboard, Wallet, Users, AlertCircle, FolderKey, LogOut, Languages, Headset } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  t: any;
  currentView: View;
  setView: (v: View) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, t, currentView, setView, lang, setLang }) => {
  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: <LayoutDashboard size={20} />, color: 'yellow' },
    { id: 'assets', label: t.myAssets, icon: <Wallet size={20} />, color: 'blue' },
    { id: 'nominees', label: t.myNominees, icon: <Users size={20} />, color: 'indigo' },
    { id: 'emergency', label: t.emergencyAccess, icon: <AlertCircle size={20} />, color: 'red' },
    { id: 'kit', label: 'Kit', icon: <FolderKey size={20} />, color: 'slate' },
    { id: 'support', label: t.customerCare, icon: <Headset size={20} />, color: 'emerald' },
  ];

  const currentTheme = navItems.find(i => i.id === currentView)?.color || 'yellow';

  const themes: Record<string, { bg: string, text: string, accent: string, shadow: string }> = {
    yellow: { bg: 'bg-yellow-500', text: 'text-slate-950', accent: 'border-yellow-500/20', shadow: 'shadow-yellow-500/20' },
    blue: { bg: 'bg-blue-600', text: 'text-white', accent: 'border-blue-500/20', shadow: 'shadow-blue-500/20' },
    indigo: { bg: 'bg-indigo-600', text: 'text-white', accent: 'border-indigo-500/20', shadow: 'shadow-indigo-500/20' },
    red: { bg: 'bg-red-600', text: 'text-white', accent: 'border-red-500/20', shadow: 'shadow-red-500/20' },
    slate: { bg: 'bg-slate-700', text: 'text-white', accent: 'border-slate-500/20', shadow: 'shadow-slate-500/20' },
    emerald: { bg: 'bg-emerald-600', text: 'text-white', accent: 'border-emerald-500/20', shadow: 'shadow-emerald-500/20' }
  };

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen pb-24 md:pb-0 md:pl-72 flex flex-col transition-all duration-700`}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 bg-slate-950/80 backdrop-blur-3xl text-white flex-col z-40 border-r border-white/5">
        <div className="p-10 mb-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('dashboard')}>
             <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-yellow-500/20 transition-transform group-hover:scale-110">M</div>
             <div>
               <h1 className="font-black text-2xl tracking-tighter uppercase gold-text leading-none">{t.title}</h1>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Safe • Secure</span>
             </div>
          </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-500 ${
                currentView === item.id 
                  ? `${theme.bg} ${theme.text} ${theme.shadow} shadow-2xl scale-[1.05]` 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform duration-500 ${currentView === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 space-y-4">
          <button 
            onClick={() => {
              const newLang = lang === 'en' ? 'hi' : 'en';
              setLang(newLang);
              localStorage.setItem('mff_lang', newLang);
            }}
            className="w-full bg-slate-900/50 border border-white/5 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 hover:border-yellow-500/30 transition-all"
          >
            <Languages size={16} className="text-yellow-500" />
            {lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-6 py-4 text-slate-500 hover:text-red-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden bg-slate-950/90 backdrop-blur-xl border-b border-white/5 p-5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gold-gradient rounded flex items-center justify-center font-black text-slate-950 text-xs shadow shadow-yellow-500/20">M</div>
          <h1 className="font-black text-white text-lg tracking-tighter uppercase gold-text leading-none">{t.title}</h1>
        </div>
        <button 
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-transform"
        >
          {lang === 'en' ? 'हिन्दी' : 'EN'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-14 max-w-7xl mx-auto w-full view-transition">
        {children}
      </main>

      {/* Tab Bar - Mobile */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center justify-around p-3 z-40 shadow-2xl">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all duration-500 ${
              currentView === item.id 
                ? `${theme.bg} ${theme.text} scale-110 shadow-xl` 
                : 'text-slate-500'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};
