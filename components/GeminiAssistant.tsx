
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';

interface GeminiAssistantProps {
  t: any;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ t }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async () => {
    if (!query) return;
    const userMsg = query;
    setMessages(prev => [...prev, {role: 'user', content: userMsg}]);
    setQuery('');
    setLoading(true);

    try {
      // Use process.env.API_KEY directly as per @google/genai guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are 'Filey', the elite AI concierge for My Final File. Your goal is to help users secure their legacy in India. Provide expert, reassuring, and legally sound advice about assets, nominees, and succession. Keep answers professional but warm. Use clear formatting."
        }
      });
      // Access the .text property directly
      setMessages(prev => [...prev, {role: 'bot', content: response.text || "I'm here to help, but I didn't catch that. Could you rephrase?"}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'bot', content: "Our encrypted neural link is temporarily busy. Please try again shortly."}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full min-h-[450px] overflow-hidden">
      <div className="bg-slate-900 p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-500/20">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-black text-white text-sm uppercase tracking-widest leading-none mb-1">Filey AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Concierge Active</span>
            </div>
          </div>
        </div>
        <Sparkles size={18} className="text-yellow-500 opacity-50" />
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-2">👋</div>
            <h4 className="font-black text-slate-900 text-lg">Hello, I'm Filey.</h4>
            <p className="text-slate-500 text-sm max-w-xs font-medium leading-relaxed">
              I can help you navigate asset nomination and Indian succession planning. What's on your mind?
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['Add Property', 'Nominee Rules'].map(tip => (
                <button 
                  key={tip}
                  onClick={() => setQuery(`How do I ${tip.toLowerCase()}?`)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-yellow-500 transition-colors"
                >
                  {tip}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-slate-950 rounded-br-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 flex items-center gap-2 text-slate-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest">Processing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative group">
          <input 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder="Ask your concierge..."
            className="w-full bg-slate-50 pr-14 pl-6 py-4 rounded-2xl border border-slate-200 shadow-inner focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 outline-none text-sm font-bold text-slate-900 placeholder:text-slate-400"
          />
          <button 
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 gold-gradient text-slate-950 rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 shadow-lg shadow-yellow-500/10"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
