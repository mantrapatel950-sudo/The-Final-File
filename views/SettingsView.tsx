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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-slate-500/10 text-slate-400 rounded-lg flex items-center justify-center border border-slate-500/20">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
          <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">Preferences & Display</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Settings */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="text-yellow-500" size={20} />
            <h3 className="text-lg font-bold text-white tracking-tight">Language</h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setLang('en');
                localStorage.setItem('mff_lang', 'en');
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                lang === 'en' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="font-medium text-sm">English</span>
              {lang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>}
            </button>

            <button
              onClick={() => {
                setLang('hi');
                localStorage.setItem('mff_lang', 'hi');
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                lang === 'hi' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="font-medium text-sm">हिंदी (Hindi)</span>
              {lang === 'hi' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>}
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            {theme === 'dark' ? <Moon className="text-blue-500" size={20} /> : <Sun className="text-yellow-500" size={20} />}
            <h3 className="text-lg font-bold text-white tracking-tight">Theme</h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                setTheme('dark');
                localStorage.setItem('mff_theme', 'dark');
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                theme === 'dark' 
                  ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Moon size={16} />
                <span className="font-medium text-sm">Dark Mode</span>
              </div>
              {theme === 'dark' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
            </button>

            <button
              onClick={() => {
                setTheme('light');
                localStorage.setItem('mff_theme', 'light');
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                theme === 'light' 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sun size={16} />
                <span className="font-medium text-sm">Light Mode</span>
              </div>
              {theme === 'light' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
