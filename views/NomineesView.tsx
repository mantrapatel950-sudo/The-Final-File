
import React, { useState } from 'react';
import { Nominee, Language } from '../types';
import { User, ShieldCheck, Fingerprint, Loader2, CheckCircle2, X, Plus, Trash2, Smartphone, Shield, ExternalLink, KeyRound, Building, UserCheck } from 'lucide-react';

interface NomineesViewProps {
  nominees: Nominee[];
  setNominees: React.Dispatch<React.SetStateAction<Nominee[]>>;
  t: any;
  lang: Language;
}

const NomineesView: React.FC<NomineesViewProps> = ({ nominees, setNominees, t, lang }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNominee, setNewNominee] = useState<Partial<Nominee>>({
    verified: false,
    sharePercentage: 0
  });
  const [verifying, setVerifying] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verificationMode, setVerificationMode] = useState<'manual' | 'digilocker' | null>(null);

  const handleSave = () => {
    if (newNominee.name && newNominee.mobile && newNominee.aadharNo && newNominee.verified) {
      const nominee: Nominee = {
        id: Date.now().toString(),
        name: newNominee.name as string,
        relation: newNominee.relation || 'Family',
        mobile: newNominee.mobile as string,
        aadharNo: newNominee.aadharNo as string,
        verified: true,
        sharePercentage: Number(newNominee.sharePercentage) || 0,
      };
      setNominees([...nominees, nominee]);
      setIsAdding(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewNominee({ verified: false, sharePercentage: 0 });
    setShowOtpInput(false);
    setOtpValue('');
    setVerificationMode(null);
  };

  const startAadharVerification = () => {
    if (newNominee.aadharNo?.length === 12) {
      setVerifying(true);
      setVerificationMode('manual');
      setTimeout(() => {
        setVerifying(false);
        setShowOtpInput(true);
      }, 1200);
    }
  };

  const verifyOtp = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setNewNominee({ ...newNominee, verified: true });
      setShowOtpInput(false);
    }, 1500);
  };

  const startDigiLockerFlow = () => {
    setVerifying(true);
    setVerificationMode('digilocker');
    setTimeout(() => {
      setVerifying(false);
      setNewNominee({ 
        ...newNominee, 
        verified: true, 
        aadharNo: '8842XXXX9912', 
        name: newNominee.name || 'KYC Verified User'
      });
    }, 2500);
  };

  return (
    <div className="space-y-12 stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div className="space-y-2">
          <div className="h-px w-16 md:w-20 bg-indigo-500/30 mb-4"></div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">{t.myNominees}</h2>
          <p className="text-slate-500 font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em]">Authorized Nominee Vault</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full md:w-auto group bg-indigo-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-[2rem] md:rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95"
          >
            <Plus size={20} strokeWidth={4} /> {t.addNominee}
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-900/40 backdrop-blur-3xl p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-2xl border border-white/10 animate-reveal relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500/30">
            <div className="h-full bg-indigo-500 animate-pulse w-full"></div>
          </div>
          
          <div className="flex justify-between items-start mb-10 md:mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4">{t.addNominee}</h3>
              <div className="flex items-center gap-2 md:gap-3 text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                KYC Verification Required
              </div>
            </div>
            <button onClick={() => { setIsAdding(false); resetForm(); }} className="bg-white/5 p-3 md:p-4 rounded-full text-slate-500 hover:text-white transition-all hover:bg-white/10 border border-white/5">
              <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-3 md:space-y-4">
              <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Legal Full Name</label>
              <div className="relative group">
                <input 
                  type="text"
                  value={newNominee.name || ''}
                  onChange={e => setNewNominee({...newNominee, name: e.target.value})}
                  placeholder="As per Government ID"
                  className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-white text-base md:text-lg shadow-inner"
                />
                <User className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Relation</label>
              <input 
                type="text"
                value={newNominee.relation || ''}
                onChange={e => setNewNominee({...newNominee, relation: e.target.value})}
                placeholder="e.g. Spouse, Child, Parent"
                className="w-full px-6 md:px-8 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-white text-base md:text-lg shadow-inner"
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">{t.sharePercentage}</label>
              <div className="relative group">
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={newNominee.sharePercentage || ''}
                  onChange={e => setNewNominee({...newNominee, sharePercentage: Number(e.target.value)})}
                  placeholder="0-100"
                  className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-black text-white text-base md:text-xl shadow-inner"
                />
                <Shield className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <label className="block text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Mobile Number</label>
              <div className="relative group">
                <input 
                  type="tel"
                  value={newNominee.mobile || ''}
                  onChange={e => setNewNominee({...newNominee, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                  placeholder="10-digit primary"
                  className="w-full pl-12 md:pl-16 pr-6 py-5 md:py-7 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono font-black text-white text-base md:text-xl tracking-widest shadow-inner"
                />
                <Smartphone className="absolute left-5 md:left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6 md:space-y-8 pt-6 md:pt-8">
               <div className="flex items-center gap-2 md:gap-4">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <span className="text-[7px] md:text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] md:tracking-[0.6em]">Biometric Verification</span>
                  <div className="h-px flex-1 bg-white/5"></div>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-2 transition-all duration-500 ${newNominee.verified && verificationMode === 'manual' ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5'}`}>
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Fingerprint size={20} className="md:w-6 md:h-6" />
                      </div>
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Manual Aadhar Entry</span>
                    </div>

                    {!showOtpInput && !newNominee.verified && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                          type="text"
                          value={newNominee.aadharNo || ''}
                          onChange={e => setNewNominee({...newNominee, aadharNo: e.target.value.replace(/\D/g, '').slice(0, 12)})}
                          placeholder="Aadhar Number"
                          className="flex-1 px-4 md:px-6 py-4 md:py-5 bg-black/40 border border-white/10 rounded-xl md:rounded-2xl outline-none font-mono font-black text-white tracking-widest text-sm md:text-base"
                        />
                        <button 
                          onClick={startAadharVerification}
                          disabled={verifying || newNominee.aadharNo?.length !== 12}
                          className="px-6 md:px-8 py-4 md:py-0 bg-indigo-600 text-white rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 disabled:opacity-20 transition-all flex items-center justify-center"
                        >
                          {verifying ? <Loader2 className="animate-spin" size={16} /> : t.verifyAadhar}
                        </button>
                      </div>
                    )}

                    {showOtpInput && (
                      <div className="animate-in slide-in-from-top-4 duration-500">
                        <p className="text-[8px] md:text-[10px] font-black text-indigo-400 mb-2 md:mb-4 uppercase tracking-[0.2em]">{t.otpSent}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <input 
                            type="text"
                            value={otpValue}
                            onChange={e => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            className="flex-1 px-4 md:px-6 py-4 md:py-5 bg-black/40 border border-indigo-500/40 rounded-xl md:rounded-2xl outline-none font-mono font-black text-white text-center text-xl md:text-2xl tracking-[0.3em] md:tracking-[0.5em]"
                          />
                          <button 
                            onClick={verifyOtp}
                            disabled={verifying || otpValue.length !== 6}
                            className="px-6 md:px-8 py-4 md:py-0 gold-gradient text-slate-950 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-yellow-500/20 flex items-center justify-center"
                          >
                            {verifying ? <Loader2 className="animate-spin" size={16} /> : t.verifyOtp}
                          </button>
                        </div>
                      </div>
                    )}

                    {newNominee.verified && verificationMode === 'manual' && (
                      <div className="flex items-center gap-3 md:gap-4 text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                        <CheckCircle2 size={20} className="md:w-6 md:h-6" /> {t.verified}
                      </div>
                    )}
                  </div>

                  <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-2 transition-all duration-500 ${newNominee.verified && verificationMode === 'digilocker' ? 'border-green-500 bg-green-500/5' : 'border-white/5 bg-blue-500/5'}`}>
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Shield size={20} className="md:w-6 md:h-6" />
                      </div>
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">DigiLocker Gov Portal</span>
                    </div>

                    {!newNominee.verified ? (
                      <button 
                        onClick={startDigiLockerFlow}
                        disabled={verifying}
                        className="w-full flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 bg-[#0061e0] text-white rounded-[1.5rem] md:rounded-[2rem] text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
                      >
                        {verifying && verificationMode === 'digilocker' ? (
                          <Loader2 className="animate-spin" size={18} className="md:w-5 md:h-5" />
                        ) : (
                          <>
                            {t.verifyViaDigiLocker} <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex flex-col gap-3 md:gap-4">
                         <div className="flex items-center gap-3 md:gap-4 text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                            <CheckCircle2 size={20} className="md:w-6 md:h-6" /> KYC SUCCESS
                         </div>
                         <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Document hash linked to vault.</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 md:gap-8">
            <button 
              onClick={() => { setIsAdding(false); resetForm(); }}
              className="flex-1 py-4 md:py-6 rounded-[2rem] md:rounded-[2.5rem] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest text-[9px] md:text-[10px]"
            >
              {t.cancel}
            </button>
            <button 
              onClick={handleSave}
              disabled={!newNominee.verified || !newNominee.name || !newNominee.mobile}
              className="flex-[2] gold-gradient text-slate-950 py-4 md:py-6 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3 md:gap-4"
            >
              <UserCheck size={18} className="md:w-5 md:h-5" /> Seal Nominee Record
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {nominees.map(nominee => (
          <div key={nominee.id} className="group glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] flex flex-col sm:flex-row items-start gap-6 md:gap-10 relative overflow-hidden transition-all duration-700 hover:-translate-y-4">
            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
              nominee.verified ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-950/40 text-slate-700'
            }`}>
              <User size={32} className="md:w-12 md:h-12" />
            </div>
            
            <div className="flex-1 space-y-4 md:space-y-6 w-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <h4 className="font-black text-2xl md:text-4xl text-white tracking-tighter leading-none">{nominee.name}</h4>
                  {nominee.verified && (
                    <div className="text-green-400 bg-green-500/5 px-2 py-1 md:px-3 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest flex items-center gap-1 md:gap-2 border border-green-500/20">
                      <ShieldCheck size={10} strokeWidth={3} className="md:w-3 md:h-3" /> {t.verified}
                    </div>
                  )}
                </div>
                <p className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">{nominee.relation}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-slate-950/60 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5">
                  <span className="block text-[7px] md:text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 md:mb-2">AUTHORIZED CONTACT</span>
                  <p className="text-white font-bold text-sm md:text-lg tracking-widest leading-none">{nominee.mobile}</p>
                </div>
                <div className="bg-slate-950/60 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5">
                  <span className="block text-[7px] md:text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 md:mb-2">SHARE ALLOCATION</span>
                  <p className="text-yellow-500 font-black text-base md:text-xl leading-none">{nominee.sharePercentage}%</p>
                </div>
                <div className={`bg-slate-950/60 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5 ${nominee.verified ? 'ring-1 ring-green-500/20' : ''} sm:col-span-2`}>
                  <span className="block text-[7px] md:text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1 md:mb-2">IDENTITY HASH</span>
                  <p className="text-white font-mono font-bold text-sm md:text-lg leading-none">•••• •••• {nominee.aadharNo.slice(-4)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setNominees(nominees.filter(n => n.id !== nominee.id))}
              className="absolute top-4 right-4 md:top-10 md:right-10 p-3 md:p-4 text-slate-800 hover:text-red-500 hover:bg-red-500/10 rounded-xl md:rounded-2xl transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        ))}

        {nominees.length === 0 && !isAdding && (
          <div className="col-span-full py-32 md:py-56 text-center bg-white/[0.01] rounded-[3rem] md:rounded-[5rem] border-4 border-white/5 border-dashed group cursor-pointer hover:border-indigo-500/20 transition-all duration-1000" onClick={() => setIsAdding(true)}>
             <div className="relative inline-block mb-8 md:mb-12">
                <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/5 flex items-center justify-center text-5xl md:text-7xl relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">👤</div>
             </div>
             <h3 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tighter">{t.noNominees}</h3>
             <p className="text-slate-600 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-10 md:mb-14 text-[9px] md:text-[11px]">Appoint a nominee to your heritage</p>
             <button className="bg-indigo-600 text-white px-10 py-4 md:px-14 md:py-6 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-2xl shadow-indigo-500/30">
               Appoint Legal Nominee
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NomineesView;
