
import React from 'react';
import { View, Language } from '../types';
import { LayoutDashboard, Wallet, Users, AlertCircle, FolderKey, LogOut, Languages, Headset, Settings } from 'lucide-react';

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
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, color: 'slate' },
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
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-950/80 backdrop-blur-3xl text-white flex-col z-40 border-r border-white/5">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('dashboard')}>
             <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-yellow-500/20 transition-transform group-hover:scale-110">M</div>
             <div>
               <h1 className="font-black text-xl tracking-tighter uppercase gold-text leading-none">{t.title}</h1>
               <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">Safe • Secure</span>
             </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all duration-500 ${
                currentView === item.id 
                  ? `${theme.bg} ${theme.text} ${theme.shadow} shadow-2xl scale-[1.02]` 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform duration-500 ${currentView === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full px-4 py-3 text-slate-500 hover:text-red-400 font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden bg-slate-950/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 gold-gradient rounded flex items-center justify-center font-black text-slate-950 text-[10px] shadow shadow-yellow-500/20">M</div>
          <h1 className="font-black text-white text-base tracking-tighter uppercase gold-text leading-none">{t.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:pl-72 max-w-7xl mx-auto w-full view-transition">
        {children}
      </main>

      {/* Tab Bar - Mobile */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] flex items-center justify-around p-2 z-40 shadow-2xl">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-500 ${
              currentView === item.id 
                ? `${theme.bg} ${theme.text} scale-110 shadow-xl` 
                : 'text-slate-500'
            }`}
          >
            {React.cloneElement(item.icon, { size: 18 })}
          </button>
        ))}
      </nav>
    </div>
  );
};
