
import React from 'react';
import { MessageSquare, Mail, PhoneCall, HelpCircle, ChevronRight, ExternalLink } from 'lucide-react';

interface SupportViewProps {
  t: any;
}

const SupportView: React.FC<SupportViewProps> = ({ t }) => {
  const faqs = [
    {
      q: "How secure is my data?",
      a: "All data is encrypted using 256-bit AES banking-grade encryption. Even we cannot read your asset identifiers without your session token."
    },
    {
      q: "What happens if I lose my phone?",
      a: "You can recover your account using your registered mobile number and OTP. We recommend adding a secondary contact in settings."
    },
    {
      q: "When will my nominee get access?",
      a: "Only after the 'Latency Threshold' you set in Emergency Protocols is breached AND (optionally) death proof is verified by our legal partners."
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{t.customerCare}</h2>
          <p className="text-slate-500 font-medium">{t.supportTagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Cards */}
        <a 
          href="https://wa.me/910000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-100 transition-all text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageSquare size={32} />
          </div>
          <h3 className="font-black text-xl text-slate-900 mb-2">{t.contactWhatsApp}</h3>
          <p className="text-slate-400 text-sm font-medium mb-6">Real-time support via encrypted chat.</p>
          <div className="mt-auto flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest">
            Open Chat <ExternalLink size={14} />
          </div>
        </a>

        <a 
          href="mailto:support@myfinalfile.com"
          className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Mail size={32} />
          </div>
          <h3 className="font-black text-xl text-slate-900 mb-2">{t.contactEmail}</h3>
          <p className="text-slate-400 text-sm font-medium mb-6">For detailed queries & legal assistance.</p>
          <div className="mt-auto flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
            Send Email <ChevronRight size={14} />
          </div>
        </a>

        <button className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-yellow-100 transition-all text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhoneCall size={32} />
          </div>
          <h3 className="font-black text-xl text-slate-900 mb-2">{t.requestCall}</h3>
          <p className="text-slate-400 text-sm font-medium mb-6">Talk to our succession experts (9AM-6PM).</p>
          <div className="mt-auto flex items-center gap-2 text-yellow-600 font-black text-xs uppercase tracking-widest">
            Schedule Call <ChevronRight size={14} />
          </div>
        </button>
      </div>

      <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <HelpCircle size={200} className="text-white" />
        </div>
        
        <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
          <HelpCircle className="text-yellow-500" size={32} />
          {t.faqTitle}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-black text-yellow-500 text-lg mb-2">Q: {faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center py-6">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2024 My Final File India Private Limited
        </p>
      </div>
    </div>
  );
};

export default SupportView;
