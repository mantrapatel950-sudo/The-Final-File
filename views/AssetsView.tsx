
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Asset, AssetType, Language } from '../types';
import { Landmark, TrendingUp, BarChart3, ShieldCheck, Wallet, Home, Plus, X, Check, Search, FileText, ChevronRight, AlertCircle, Lock, Sparkles, Building2, CreditCard, Landmark as BankIcon, BadgePercent, Coins, MapPin } from 'lucide-react';

interface AssetsViewProps {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  t: any;
  lang: Language;
}

const POPULAR_INSTITUTIONS: Record<string, string[]> = {
  [AssetType.BANK]: [
    "State Bank of India (SBI)", "HDFC Bank", "ICICI Bank", "Axis Bank", 
    "Kotak Mahindra Bank", "IndusInd Bank", "IDFC FIRST Bank", "Yes Bank", 
    "Punjab National Bank (PNB)", "Bank of Baroda (BOB)", "Canara Bank", 
    "Union Bank of India", "IDBI Bank", "Federal Bank", "Standard Chartered", 
    "DBS Bank India", "Bandhan Bank", "RBL Bank", "HSBC India", "South Indian Bank"
  ],
  [AssetType.STOCKS]: [
    "Zerodha (Kite)", "Groww", "Upstox", "Angel One", "ICICI Direct", 
    "HDFC Securities", "Kotak Securities", "Motilal Oswal", "5paisa", 
    "Sharekhan", "Edelweiss", "IIFL Securities", "Axis Direct", "Paytm Money", "Dhan", "Fyers"
  ],
  [AssetType.MUTUAL_FUNDS]: [
    "SBI Mutual Fund", "ICICI Prudential Mutual Fund", "HDFC Mutual Fund", 
    "Nippon India Mutual Fund", "Axis Mutual Fund", "UTI Mutual Fund", 
    "Aditya Birla Sun Life MF", "Kotak Mutual Fund", "DSP Mutual Fund", 
    "Mirae Asset Mutual Fund", "Tata Mutual Fund", "Quant Mutual Fund", "Parag Parikh MF", "Canara Robeco MF"
  ],
  [AssetType.INSURANCE]: [
    "Life Insurance Corporation (LIC)", "HDFC Life", "ICICI Prudential Life", 
    "SBI Life Insurance", "Max Life Insurance", "Tata AIA Life Insurance", 
    "Bajaj Allianz Life", "Kotak Life", "Reliance General", "Star Health Insurance", 
    "Niva Bupa Health", "Care Health Insurance", "Acko", "Digit Insurance"
  ],
  [AssetType.CRYPTO]: [
    "CoinDCX", "WazirX", "CoinSwitch", "ZebPay", "Binance", "Coinbase", 
    "Metamask Wallet", "Ledger Hardware Wallet", "Trust Wallet", "Phantom Wallet"
  ],
  [AssetType.PROPERTY]: [
    "Residential Apartment", "Independent House", "Agricultural Land", 
    "Commercial Plot", "Retail Shop", "Industrial Warehouse", "Villa", "Penthouse"
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const AssetsView: React.FC<AssetsViewProps> = ({ assets, setAssets, t, lang }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ type: AssetType.BANK });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    if (newAsset.institutionName && newAsset.accountNo) {
      const asset: Asset = {
        id: Date.now().toString(),
        type: newAsset.type as AssetType,
        institutionName: newAsset.institutionName as string,
        accountNo: newAsset.accountNo as string,
        notes: newAsset.notes,
        value: Number(newAsset.value) || 0,
      };
      setAssets([...assets, asset]);
      resetAddForm();
    }
  };

  const resetAddForm = () => {
    setIsAdding(false);
    setStep(1);
    setNewAsset({ type: AssetType.BANK });
    setSearchTerm('');
  };

  const assetIcons = {
    [AssetType.BANK]: <BankIcon size={28} />,
    [AssetType.STOCKS]: <TrendingUp size={28} />,
    [AssetType.MUTUAL_FUNDS]: <BarChart3 size={28} />,
    [AssetType.INSURANCE]: <ShieldCheck size={28} />,
    [AssetType.CRYPTO]: <Coins size={28} />,
    [AssetType.PROPERTY]: <Home size={28} />,
  };

  const filteredSuggestions = useMemo(() => {
    const list = POPULAR_INSTITUTIONS[newAsset.type || AssetType.BANK] || [];
    if (!searchTerm) return list;
    return list.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [newAsset.type, searchTerm]);

  return (
    <div className="space-y-12 stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div className="space-y-2">
          <div className="h-px w-16 md:w-20 bg-blue-500/30 mb-4"></div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">{t.myAssets}</h2>
          <p className="text-slate-500 font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em]">Precision Legacy Inventory</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full md:w-auto group bg-blue-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-[2rem] md:rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
          >
            <Plus size={20} strokeWidth={4} /> {t.addAsset}
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-900/40 backdrop-blur-3xl p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-white/10 animate-reveal relative overflow-hidden">
          {/* Form Progress Indicator */}
          <div className="absolute top-0 left-0 w-full flex h-1.5">
             <div className={`h-full bg-blue-500 transition-all duration-700 ${step >= 1 ? 'w-1/3' : 'w-0'}`}></div>
             <div className={`h-full bg-blue-500 transition-all duration-700 ${step >= 2 ? 'w-1/3' : 'w-0'}`}></div>
             <div className={`h-full bg-blue-500 transition-all duration-700 ${step >= 3 ? 'w-1/3' : 'w-0'}`}></div>
          </div>
          
          <div className="flex justify-between items-start mb-10 md:mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">{t.addAsset}</h3>
              <div className="flex items-center gap-2 md:gap-3 text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                Vault Step {step} of 3
              </div>
            </div>
            <button onClick={resetAddForm} className="bg-white/5 p-3 md:p-4 rounded-full text-slate-500 hover:text-white transition-all hover:bg-white/10 border border-white/5">
              <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-8 md:space-y-12 animate-in slide-in-from-right-10 duration-500">
               <div className="space-y-2 md:space-y-4">
                  <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Choose Category</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium">Select the type of asset to initialize encryption.</p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {Object.values(AssetType).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setNewAsset({...newAsset, type, institutionName: ''});
                      setSearchTerm('');
                      setStep(2);
                    }}
                    className={`relative group flex flex-col items-center justify-center p-4 md:p-8 rounded-[1.5rem] md:rounded-[3.5rem] border-2 transition-all duration-500 ${
                      newAsset.type === type 
                        ? 'border-blue-500 bg-blue-500/10 text-white ring-4 md:ring-8 ring-blue-500/5 scale-105 shadow-2xl shadow-blue-500/20' 
                        : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2'
                    }`}
                  >
                    <div className={`mb-4 md:mb-6 transition-transform duration-500 group-hover:scale-110 ${newAsset.type === type ? 'text-blue-400' : 'text-slate-600'}`}>
                      {assetIcons[type]}
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center leading-tight">{t.assetTypes[type]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 md:space-y-12 animate-in slide-in-from-right-10 duration-500">
               <div className="space-y-2 md:space-y-4">
                  <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Security Details</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium">Specify the institution and account identifiers.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                 {/* Auto-suggest Search */}
                 <div className="space-y-3 md:space-y-4 relative" ref={suggestionRef}>
                    <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Institution / Body</label>
                    <div className="relative group">
                      <input 
                        type="text"
                        value={searchTerm}
                        onFocus={() => setShowSuggestions(true)}
                        onChange={e => {
                          setSearchTerm(e.target.value);
                          setNewAsset({...newAsset, institutionName: e.target.value});
                        }}
                        placeholder={`Search ${t.assetTypes[newAsset.type || AssetType.BANK]}...`}
                        className="w-full pl-12 md:pl-16 pr-8 md:pr-12 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-white text-base md:text-lg shadow-inner"
                      />
                      <Search className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    
                    {showSuggestions && (
                      <div className="absolute z-50 left-0 right-0 mt-4 bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] max-h-80 overflow-y-auto animate-reveal">
                        <div className="p-4 space-y-1">
                          <div className="px-6 py-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] border-b border-white/5 mb-2 flex items-center gap-3">
                            <Sparkles size={14} className="text-yellow-500" /> Indian Financial Network
                          </div>
                          {filteredSuggestions.map((name, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setNewAsset({ ...newAsset, institutionName: name });
                                setSearchTerm(name);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-6 py-5 rounded-[1.8rem] hover:bg-blue-600 hover:text-white font-bold text-base text-slate-400 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-4">
                                 <Building2 size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                                 <span>{name}</span>
                              </div>
                              <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </button>
                          ))}
                          {filteredSuggestions.length === 0 && (
                             <div className="px-10 py-12 text-center text-slate-600">
                                <p className="text-[10px] font-black uppercase tracking-widest">Custom Entry Detected</p>
                             </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Secure Identifier (A/C, Folio, ID)</label>
                    <div className="relative group">
                      <input 
                        type="text"
                        value={newAsset.accountNo || ''}
                        onChange={e => setNewAsset({...newAsset, accountNo: e.target.value})}
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono font-black text-white text-base md:text-lg tracking-widest shadow-inner"
                      />
                      <FileText className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
               </div>

               <div className="flex gap-4 md:gap-6">
                 <button onClick={() => setStep(1)} className="px-6 md:px-10 py-5 md:py-6 rounded-[2rem] font-black text-slate-500 uppercase tracking-widest text-[9px] md:text-[11px] hover:text-white transition-colors">Go Back</button>
                 <button 
                  onClick={() => setStep(3)}
                  disabled={!newAsset.institutionName || !newAsset.accountNo}
                  className="flex-1 gold-gradient text-slate-950 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase tracking-widest text-xs md:text-sm shadow-xl shadow-yellow-500/20 transition-all disabled:opacity-20"
                 >
                   Next Stage
                 </button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 md:space-y-12 animate-in slide-in-from-right-10 duration-500">
               <div className="space-y-2 md:space-y-4">
                  <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Final Calibration</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium">Add valuation and final instructions for the vault.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3 md:space-y-4">
                    <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Market Valuation (Optional)</label>
                    <div className="relative group">
                      <div className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 font-black text-xl md:text-2xl group-focus-within:text-blue-500">₹</div>
                      <input 
                        type="number"
                        value={newAsset.value || ''}
                        onChange={e => setNewAsset({...newAsset, value: Number(e.target.value)})}
                        placeholder="0.00"
                        className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-black text-2xl md:text-4xl text-white group-hover:bg-white/10 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Succession Notes</label>
                    <textarea 
                      value={newAsset.notes || ''}
                      rows={1}
                      onChange={e => setNewAsset({...newAsset, notes: e.target.value})}
                      placeholder="Special instructions for heirs..."
                      className="w-full px-6 md:px-8 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-white resize-none text-base md:text-lg shadow-inner"
                    />
                  </div>
               </div>

               <div className="flex gap-6">
                 <button onClick={() => setStep(2)} className="px-10 py-6 rounded-[2rem] font-black text-slate-500 uppercase tracking-widest text-[11px] hover:text-white transition-colors">Go Back</button>
                 <button 
                  onClick={handleSave}
                  className="flex-1 gold-gradient text-slate-950 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                 >
                   <Lock size={20} strokeWidth={3} className="group-hover:animate-bounce" />
                   {t.save}
                 </button>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Grid of Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {assets.map(asset => (
          <div key={asset.id} className="group glass-card p-12 rounded-[4rem] flex flex-col h-full relative overflow-hidden transition-all duration-700 hover:-translate-y-4">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] transition-transform duration-1000 group-hover:scale-150 group-hover:rotate-12">
              {assetIcons[asset.type]}
            </div>
            
            <div className="flex items-center justify-between mb-12">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-blue-400 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {assetIcons[asset.type]}
              </div>
              <button 
                onClick={() => setAssets(assets.filter(a => a.id !== asset.id))}
                className="p-4 text-slate-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1">
              <h4 className="font-black text-4xl text-white tracking-tighter leading-tight mb-3 group-hover:gold-text transition-all">{asset.institutionName}</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-10">{t.assetTypes[asset.type]}</p>
              
              <div className="bg-slate-950/60 p-8 rounded-3xl border border-white/5 mb-10 shadow-inner group-hover:border-blue-500/20 transition-all">
                <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">AUTHORIZED IDENTIFIER</span>
                <p className="text-white font-mono font-black text-2xl truncate tracking-tight">{asset.accountNo}</p>
              </div>

              {asset.notes && (
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-10 italic opacity-60 line-clamp-2">
                  "{asset.notes}"
                </p>
              )}
            </div>
            
            <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-end">
              <div>
                 <span className="block text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">VALUATION</span>
                 <p className="text-3xl font-black text-white tracking-tighter">{formatCurrency(asset.value || 0)}</p>
              </div>
              <div className="flex items-center gap-3 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] bg-green-500/5 px-5 py-2.5 rounded-full border border-green-500/20">
                <ShieldCheck size={16} className="animate-pulse" /> PROTECTED
              </div>
            </div>
          </div>
        ))}

        {assets.length === 0 && !isAdding && (
          <div className="col-span-full py-56 text-center bg-white/[0.01] rounded-[5rem] border-4 border-white/5 border-dashed group cursor-pointer hover:border-yellow-500/20 transition-all duration-1000" onClick={() => setIsAdding(true)}>
             <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-32 h-32 bg-white/5 rounded-[4rem] border border-white/5 flex items-center justify-center text-7xl relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">🏛️</div>
             </div>
             <h3 className="text-5xl font-black text-white mb-6 tracking-tighter">{t.noAssets}</h3>
             <p className="text-slate-600 font-black uppercase tracking-[0.5em] mb-14 text-[11px]">Initialize your digital estate</p>
             <button className="gold-gradient text-slate-950 px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-yellow-500/30">
               Begin Vault Entry
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsView;
