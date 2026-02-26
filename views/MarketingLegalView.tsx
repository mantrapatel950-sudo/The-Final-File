
import React, { useState } from 'react';
import { Language } from '../types';

interface KitViewProps {
  t: any;
  lang: Language;
}

const MarketingLegalView: React.FC<KitViewProps> = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'legal' | 'partner'>('marketing');

  const marketingKit = {
    reelHindi: {
      title: "Instagram / YouTube Reel Script (Hindi)",
      content: `Hook:\n"अगर आज आपको कुछ हो जाए,\nतो आपकी मेहनत की कमाई आपके परिवार तक पहुँचेगी या नहीं?"\n\nMiddle:\n"भारत में हजारों करोड़ रुपये की संपत्तियाँ\nबस इसलिए अटकी रहती हैं क्योंकि परिवार को जानकारी नहीं होती।"\n\nEnding:\n"My Final File – सुरक्षित करें, जो सबसे ज़रूरी है।"`,
    },
    reelEnglish: {
      title: "Instagram / YouTube Reel Script (English)",
      content: `Hook:\n“If something happens to you today,\nwill your family know where your investments are?”\n\nEnding:\n“My Final File – Secure what matters.”`,
    },
    whatsapp: {
      title: "WhatsApp Message (For Sharing)",
      content: lang === 'hi' 
        ? "My Final File आपकी संपत्तियों को सुरक्षित रखने में मदद करता है ताकि आपके परिवार को ज़रूरत पड़ने पर आसानी हो। ऐप डाउनलोड करें।"
        : "My Final File helps you securely store all your financial assets and ensure your family can access them easily. Secure your legacy today."
    }
  };

  const legalKit = [
    { title: "Privacy Policy", items: ["Data encryption", "No sharing with third parties", "Secure storage", "User rights"] },
    { title: "Terms & Conditions", items: ["User responsibility", "Platform limitations", "No financial advice"] },
    { title: "User Consent Form", items: ["Secure storage authorization", "Identity verification agreement"] }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Startup Resources</h2>
        <p className="text-slate-500">Marketing, Legal, and Partnership assets for My Final File.</p>
      </div>

      <div className="flex p-1 bg-slate-200 rounded-xl max-w-md">
        <button 
          onClick={() => setActiveTab('marketing')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === 'marketing' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
        >
          {t.marketingKit}
        </button>
        <button 
          onClick={() => setActiveTab('legal')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === 'legal' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
        >
          {t.legalKit}
        </button>
        <button 
          onClick={() => setActiveTab('partner')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === 'partner' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
        >
          Outreach
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">{marketingKit.reelHindi.title}</h3>
              <div className="bg-slate-50 p-4 rounded-xl text-slate-700 whitespace-pre-wrap text-sm border border-slate-100">
                {marketingKit.reelHindi.content}
              </div>
              <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">Copy Script</button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">{marketingKit.whatsapp.title}</h3>
              <div className="bg-slate-50 p-4 rounded-xl text-slate-700 whitespace-pre-wrap text-sm border border-slate-100">
                {marketingKit.whatsapp.content}
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                <span>💬</span> Share on WhatsApp
              </button>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legalKit.map(item => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map(sub => (
                    <li key={sub} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-green-500">✓</span> {sub}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-xs">View Draft</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'partner' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
            <h3 className="font-bold text-slate-900 mb-6">Partner Outreach Email (CA / Lawyer)</h3>
            <div className="bg-slate-900 p-6 rounded-xl text-slate-300 font-mono text-sm leading-relaxed">
              <p className="text-yellow-400 mb-4">Subject: Partnership Opportunity – My Final File</p>
              <p>Hello,</p>
              <p className="my-4">We are building My Final File, a digital platform that helps families access financial assets after the loss of a loved one.</p>
              <p className="my-4">We are looking for trusted legal and financial partners to support users with succession and claim processes.</p>
              <p className="my-4">We offer referral commissions and long-term collaboration. Would love to discuss further.</p>
              <p>Regards,<br />Team My Final File</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700">Send Email</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingLegalView;
