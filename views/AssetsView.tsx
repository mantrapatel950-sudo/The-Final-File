
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
    [AssetType.BANK]: <BankIcon size={20} />,
    [AssetType.STOCKS]: <TrendingUp size={20} />,
    [AssetType.MUTUAL_FUNDS]: <BarChart3 size={20} />,
    [AssetType.INSURANCE]: <ShieldCheck size={20} />,
    [AssetType.CRYPTO]: <Coins size={20} />,
    [AssetType.PROPERTY]: <Home size={20} />,
  };

  const filteredSuggestions = useMemo(() => {
    const list = POPULAR_INSTITUTIONS[newAsset.type || AssetType.BANK] || [];
    if (!searchTerm) return list;
    return list.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [newAsset.type, searchTerm]);

  return (
    <div className="space-y-6 stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="h-px w-12 bg-blue-500/30 mb-2"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{t.myAssets}</h2>
          <p className="text-slate-500 text-xs uppercase tracking-wider">Precision Legacy Inventory</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={3} /> {t.addAsset}
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-white/10 animate-reveal relative overflow-hidden">
          {/* Form Progress Indicator */}
          <div className="absolute top-0 left-0 w-full flex h-1">
             <div className={`h-full bg-blue-500 transition-all duration-500 ${step >= 1 ? 'w-1/3' : 'w-0'}`}></div>
             <div className={`h-full bg-blue-500 transition-all duration-500 ${step >= 2 ? 'w-1/3' : 'w-0'}`}></div>
             <div className={`h-full bg-blue-500 transition-all duration-500 ${step >= 3 ? 'w-1/3' : 'w-0'}`}></div>
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{t.addAsset}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                Step {step} of 3
              </div>
            </div>
            <button onClick={resetAddForm} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-1">
                  <h4 className="text-base font-semibold text-white">Choose Category</h4>
                  <p className="text-slate-400 text-sm">Select the type of asset to initialize.</p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.values(AssetType).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setNewAsset({...newAsset, type, institutionName: ''});
                      setSearchTerm('');
                      setStep(2);
                    }}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                      newAsset.type === type 
                        ? 'border-blue-500 bg-blue-500/10 text-white shadow-sm' 
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className={`mb-2 ${newAsset.type === type ? 'text-blue-400' : 'text-slate-500'}`}>
                      {assetIcons[type]}
                    </div>
                    <span className="text-xs font-medium text-center">{t.assetTypes[type]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-1">
                  <h4 className="text-base font-semibold text-white">Security Details</h4>
                  <p className="text-slate-400 text-sm">Specify the institution and account identifiers.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Auto-suggest Search */}
                 <div className="space-y-1.5 relative" ref={suggestionRef}>
                    <label className="block text-xs font-medium text-slate-400 ml-1">Institution / Body</label>
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
                        className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    </div>
                    
                    {showSuggestions && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        <div className="p-2 space-y-1">
                          {filteredSuggestions.map((name, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setNewAsset({ ...newAsset, institutionName: name });
                                setSearchTerm(name);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-600 hover:text-white text-sm text-slate-300 transition-colors flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2">
                                 <Building2 size={14} className="opacity-50 group-hover:opacity-100" />
                                 <span>{name}</span>
                              </div>
                            </button>
                          ))}
                          {filteredSuggestions.length === 0 && (
                             <div className="px-4 py-6 text-center text-slate-500 text-sm">
                                <p>Custom Entry Detected</p>
                             </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400 ml-1">Secure Identifier (A/C, Folio, ID)</label>
                    <div className="relative group">
                      <input 
                        type="text"
                        value={newAsset.accountNo || ''}
                        onChange={e => setNewAsset({...newAsset, accountNo: e.target.value})}
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-white text-sm"
                      />
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    </div>
                  </div>
               </div>

               <div className="flex gap-3 pt-2">
                 <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg font-medium text-slate-400 text-sm hover:text-white hover:bg-white/5 transition-colors">Back</button>
                 <button 
                  onClick={() => setStep(3)}
                  disabled={!newAsset.institutionName || !newAsset.accountNo}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Next Stage
                 </button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-1">
                  <h4 className="text-base font-semibold text-white">Final Calibration</h4>
                  <p className="text-slate-400 text-sm">Add valuation and final instructions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400 ml-1">Market Valuation (Optional)</label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">₹</div>
                      <input 
                        type="number"
                        value={newAsset.value || ''}
                        onChange={e => setNewAsset({...newAsset, value: Number(e.target.value)})}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400 ml-1">Succession Notes</label>
                    <textarea 
                      value={newAsset.notes || ''}
                      rows={2}
                      onChange={e => setNewAsset({...newAsset, notes: e.target.value})}
                      placeholder="Special instructions for heirs..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white resize-none text-sm"
                    />
                  </div>
               </div>

               <div className="flex gap-3 pt-2">
                 <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg font-medium text-slate-400 text-sm hover:text-white hover:bg-white/5 transition-colors">Back</button>
                 <button 
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                 >
                   <Lock size={16} />
                   {t.save}
                 </button>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Grid of Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map(asset => (
          <div key={asset.id} className="bg-slate-900/50 border border-white/10 p-5 rounded-xl flex flex-col h-full relative overflow-hidden transition-all hover:border-white/20">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              {assetIcons[asset.type]}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                {assetIcons[asset.type]}
              </div>
              <button 
                onClick={() => setAssets(assets.filter(a => a.id !== asset.id))}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-white mb-1 truncate">{asset.institutionName}</h4>
              <p className="text-xs font-medium text-slate-500 mb-4">{t.assetTypes[asset.type]}</p>
              
              <div className="bg-black/20 p-3 rounded-lg border border-white/5 mb-4">
                <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Identifier</span>
                <p className="text-slate-300 font-mono text-sm truncate">{asset.accountNo}</p>
              </div>

              {asset.notes && (
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                  {asset.notes}
                </p>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-end">
              <div>
                 <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">Valuation</span>
                 <p className="text-base font-semibold text-white">{formatCurrency(asset.value || 0)}</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-medium uppercase tracking-wider bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                <ShieldCheck size={12} /> Protected
              </div>
            </div>
          </div>
        ))}

        {assets.length === 0 && !isAdding && (
          <div className="col-span-full py-16 text-center bg-white/5 rounded-xl border-2 border-white/10 border-dashed cursor-pointer hover:border-blue-500/30 hover:bg-white/10 transition-all" onClick={() => setIsAdding(true)}>
             <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🏛️</div>
             <h3 className="text-lg font-semibold text-white mb-2">{t.noAssets}</h3>
             <p className="text-slate-400 text-sm mb-6">Initialize your digital estate</p>
             <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
               Begin Vault Entry
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsView;
