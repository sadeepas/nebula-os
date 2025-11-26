import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/gemini';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AssistantApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your AI assistant powered by Gemini. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal message format to Gemini API format
      const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));
      
      const responseText = await generateChatResponse(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
             <Sparkles size={20} className="text-white" />
        </div>
        <div>
            <h3 className="font-semibold">Gemini Assistant</h3>
            <p className="text-xs text-slate-400">Always here to help</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-slate-700 text-slate-200 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
               <Bot size={16} />
             </div>
             <div className="bg-slate-700 rounded-2xl rounded-tl-sm p-3 flex gap-1 items-center">
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
             </div>
           </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 pl-4 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
