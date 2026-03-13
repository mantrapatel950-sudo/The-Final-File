
import React from 'react';
import { Asset, Nominee, View, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
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
    <div className="space-y-6 stagger-in">
      {/* Header Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-green-400 bg-green-500/10 w-fit px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
            <Lock size={12} className="animate-pulse" /> {lang === 'hi' ? 'वॉल्ट सुरक्षित' : 'VAULT SECURED'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t.dashboard}
          </h2>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setView('assets')}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {t.addAsset} <TrendingUp size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Wealth & Protection Combined Highlight */}
        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 backdrop-blur-xl rounded-xl p-5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <ShieldCheck size={120} className="text-white" />
          </div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <h3 className="text-slate-400 font-semibold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-yellow-500" /> {t.totalWealth}
              </h3>
              <p className="text-3xl font-bold text-white leading-none mb-3 truncate">
                {formatCurrency(totalValuation)}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/10 text-white px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border border-white/10">
                  {assets.length} {lang === 'hi' ? 'संपत्तियां' : 'Assets Linked'}
                </span>
                <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-md border border-white/5">AES-256 Encrypted</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setView('assets')}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-medium text-xs uppercase tracking-wider transition-colors border border-white/10"
              >
                Portfolio
              </button>
              <button 
                onClick={() => setView('kit')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Legal Kit
              </button>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-5 border border-white/5 flex flex-col items-center justify-center text-center relative z-10">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">{t.vaultProtection}</h3>
            <div className="relative w-24 h-24 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={45}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">{totalScore}%</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
               <p className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">
                {totalScore > 80 ? '🔒 Ultimate Shield' : '⚠️ Action Required'}
              </p>
            </div>
          </div>
        </div>

        {/* Action List Sidebar */}
        <div className="md:col-span-12 lg:col-span-4 space-y-4">
          <div onClick={() => setView('subscription')} className="cursor-pointer bg-yellow-500/10 hover:bg-yellow-500/20 p-4 rounded-xl relative overflow-hidden border border-yellow-500/20 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-yellow-500">
              <Award size={40} />
            </div>
            <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <h3 className="text-yellow-500/80 font-semibold text-[10px] uppercase tracking-wider mb-1">Premium Plan</h3>
            <p className="text-lg font-bold text-white leading-none">Upgrade Now</p>
          </div>

          <div onClick={() => setView('nominees')} className="cursor-pointer bg-slate-900/50 hover:bg-slate-800 p-4 rounded-xl relative overflow-hidden border border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Users size={40} />
            </div>
            <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center mb-3">
              <Users size={20} />
            </div>
            <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider mb-1">{t.myNominees}</h3>
            <p className="text-2xl font-bold text-white leading-none">{nominees.length}</p>
          </div>

          <div onClick={() => setView('emergency')} className="cursor-pointer bg-slate-900/50 hover:bg-slate-800 p-4 rounded-xl relative overflow-hidden border border-white/10 transition-colors">
             <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500">
              <Activity size={40} />
            </div>
            <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center mb-3">
              <Activity size={20} />
            </div>
            <h3 className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider mb-1">Succession Protocol</h3>
            <p className="text-lg font-bold text-white leading-none">Active Trigger</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-900/50 p-5 rounded-xl flex flex-col min-h-[300px] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-white">
              Asset Map
            </h3>
            <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-slate-300 uppercase tracking-wider font-medium">
              Portfolio View
            </span>
          </div>
          
          <div className="flex-1">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={80} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ background: '#1e293b', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', fontSize: '12px' }}
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl border border-white/10">📊</div>
                <p className="font-medium text-xs">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-white">
            Subscription History
          </h3>
          <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-slate-300 uppercase tracking-wider font-medium">
            Billing
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white">
              {[
                { id: 'tx-1', date: '2026-02-28', amount: 1499, method: 'Credit Card (•••• 4242)', status: 'Completed' },
                { id: 'tx-2', date: '2026-01-28', amount: 1499, method: 'Credit Card (•••• 4242)', status: 'Completed' },
                { id: 'tx-3', date: '2025-12-28', amount: 1499, method: 'Credit Card (•••• 4242)', status: 'Completed' },
              ].map((tx) => (
                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pl-2 font-mono text-xs text-slate-300">{tx.date}</td>
                  <td className="py-3 font-medium text-white">{formatCurrency(tx.amount)}</td>
                  <td className="py-3 text-xs text-slate-400 flex items-center gap-2">
                    <Wallet size={14} className="text-slate-500" />
                    {tx.method}
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-medium uppercase tracking-wider border border-green-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
