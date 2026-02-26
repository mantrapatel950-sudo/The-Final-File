import React from 'react';
import { Language } from '../types';
import { Settings, Languages, Moon, Sun } from 'lucide-react';

interface SettingsViewProps {
  lang: Language;
  setLang: (l: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  t: any;
}

const SettingsView: React.FC<SettingsViewProps> = ({ lang, setLang, theme, setTheme, t }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-500/10 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-500/20">
          <Settings size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Settings</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Preferences & Display</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Settings */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="text-yellow-500" size={24} />
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Language</h3>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setLang('en');
                localStorage.setItem('mff_lang', 'en');
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                lang === 'en' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="font-bold">English</span>
              {lang === 'en' && <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>}
            </button>

            <button
              onClick={() => {
                setLang('hi');
                localStorage.setItem('mff_lang', 'hi');
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                lang === 'hi' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="font-bold">हिंदी (Hindi)</span>
              {lang === 'hi' && <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>}
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            {theme === 'dark' ? <Moon className="text-blue-500" size={24} /> : <Sun className="text-yellow-500" size={24} />}
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Theme</h3>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setTheme('dark');
                localStorage.setItem('mff_theme', 'dark');
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon size={18} />
                <span className="font-bold">Dark Mode</span>
              </div>
              {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
            </button>

            <button
              onClick={() => {
                setTheme('light');
                localStorage.setItem('mff_theme', 'light');
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                theme === 'light' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun size={18} />
                <span className="font-bold">Light Mode</span>
              </div>
              {theme === 'light' && <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
