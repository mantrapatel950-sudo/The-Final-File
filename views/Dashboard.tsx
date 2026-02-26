
import React from 'react';
import { Asset, Nominee, View, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import GeminiAssistant from '../components/GeminiAssistant';
import { TrendingUp, ShieldCheck, Users, ArrowUpRight, Wallet, Award, Activity, IndianRupee, Lock, ChevronRight, Sparkles } from 'lucide-react';

interface DashboardProps {
  assets: Asset[];
  nominees: Nominee[];
  t: any;
  setView: (v: View) => void;
  lang: Language;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const Dashboard: React.FC<DashboardProps> = ({ assets, nominees, t, setView, lang }) => {
  const data = Object.values(assets.reduce((acc: any, asset) => {
    acc[asset.type] = acc[asset.type] || { name: t.assetTypes[asset.type], count: 0, value: 0 };
    acc[asset.type].count += 1;
    acc[asset.type].value += (asset.value || 0);
    return acc;
  }, {}));

  const totalValuation = assets.reduce((sum, asset) => sum + (asset.value || 0), 0);
  const assetScore = Math.min(assets.length * 15, 60);
  const nomineeScore = nominees.length > 0 ? 40 : 0;
  const totalScore = assetScore + nomineeScore;

  const scoreData = [
    { value: totalScore, fill: totalScore > 70 ? '#10b981' : totalScore > 40 ? '#f59e0b' : '#ef4444' },
    { value: 100 - totalScore, fill: 'rgba(255,255,255,0.05)' }
  ];

  const COLORS = ['#d4af37', '#6366f1', '#10b981', '#ef4444', '#f59e0b', '#06b6d4'];

  return (
    <div className="space-y-12 stagger-in">
      {/* Header Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-400 bg-green-500/10 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-500/20 shadow-lg shadow-green-500/5">
            <Lock size={12} strokeWidth={3} className="animate-pulse" /> {lang === 'hi' ? 'वॉल्ट सुरक्षित' : 'VAULT SECURED'}
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            {t.dashboard}
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('assets')}
            className="group gold-gradient text-slate-950 px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-[1.05] active:scale-95 transition-all shadow-2xl shadow-yellow-500/30 flex items-center gap-4 hover-glow"
          >
            {t.addAsset} <TrendingUp size={24} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Wealth & Protection Combined Highlight */}
        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/40 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <ShieldCheck size={300} className="text-white" />
          </div>
          
          <div className="space-y-12 relative z-10">
            <div>
              <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-500" /> {t.totalWealth}
              </h3>
              <p className="text-6xl md:text-7xl font-black gold-text leading-none mb-6">
                {formatCurrency(totalValuation)}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {assets.length} {lang === 'hi' ? 'संपत्तियां' : 'Assets Linked'}
                </span>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-950/50 px-4 py-2 rounded-xl border border-white/5">AES-256 Encrypted</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setView('assets')}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5"
              >
                Portfolio
              </button>
              <button 
                onClick={() => setView('kit')}
                className="flex-1 gold-gradient text-slate-950 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-yellow-500/20"
              >
                Legal Kit
              </button>
            </div>
          </div>

          <div className="bg-slate-950/40 backdrop-blur-md rounded-[3rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center relative z-10 shadow-inner">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8">{t.vaultProtection}</h3>
            <div className="relative w-44 h-44 mb-8 group/pie">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={scoreData[0].fill} />
                    <Cell fill={scoreData[1].fill} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover/pie:scale-110">
                <span className="text-5xl font-black text-white tracking-tighter">{totalScore}%</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Status</span>
              </div>
            </div>
            <div className="px-6 py-2 bg-white/5 rounded-full border border-white/5">
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                {totalScore > 80 ? '🔒 Ultimate Shield' : '⚠️ Action Required'}
              </p>
            </div>
          </div>
        </div>

        {/* Action List Sidebar */}
        <div className="md:col-span-12 lg:col-span-4 space-y-6">
          <div onClick={() => setView('nominees')} className="cursor-pointer group glass-card p-10 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
              <Users size={80} />
            </div>
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-3xl border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg">
              <Users size={32} />
            </div>
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">{t.myNominees}</h3>
            <p className="text-5xl font-black text-white leading-none tracking-tighter">{nominees.length}</p>
            <div className="mt-8 flex items-center text-indigo-400 font-black text-[10px] uppercase tracking-widest gap-2 group-hover:translate-x-2 transition-transform">
              {t.myNominees} <ChevronRight size={14} />
            </div>
          </div>

          <div onClick={() => setView('emergency')} className="cursor-pointer group glass-card p-10 rounded-[3rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-red-500">
              <Activity size={80} />
            </div>
            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-3xl border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-lg">
              <Activity size={32} />
            </div>
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Succession Protocol</h3>
            <p className="text-2xl font-black text-white leading-none tracking-tight">Active Trigger</p>
            <div className="mt-8 flex items-center text-red-400 font-black text-[10px] uppercase tracking-widest gap-2 group-hover:translate-x-2 transition-transform">
              Review Protocols <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-12 rounded-[4rem] flex flex-col min-h-[500px] border border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-black text-3xl text-white tracking-tighter flex items-center gap-4">
              Asset Map
            </h3>
            <span className="text-[10px] bg-white/5 px-4 py-2 rounded-full text-slate-500 uppercase tracking-widest font-black border border-white/5">
              Portfolio View
            </span>
          </div>
          
          <div className="flex-1">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} width={110} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ background: '#0f172a', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', padding: '20px' }}
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                  />
                  <Bar dataKey="value" radius={[0, 20, 20, 0]} barSize={32}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-6 opacity-30">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner border border-white/5">📊</div>
                <p className="font-black uppercase tracking-[0.3em] text-[10px]">Data Stream Empty</p>
              </div>
            )}
          </div>
        </div>

        <GeminiAssistant t={t} />
      </div>
    </div>
  );
};

export default Dashboard;
