import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User as UserIcon, 
  Loader2, 
  Lightbulb
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { aiAPI } from '../services/api';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import AIPulse from '../components/AIPulse';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const { profile } = useApp();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I'm FitBuddy AI, your personal 24/7 fitness & wellness coach. How can I help you optimize your workout or nutrition today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await aiAPI.sendChatMessage(query, profile || undefined);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.data?.reply || res.data?.text || "I'm analyzing your request. Keep pushing towards your daily goal!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "For optimal muscle growth and recovery, ensure you consume 1.6g to 2.2g of protein per kg of body weight daily and prioritize 7-8 hours of continuous sleep.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Create today's workout",
    "Improve my routine",
    "Give me healthy meal ideas",
    "Explain this exercise",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">FitBuddy AI</h1>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                ● Online
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Powered by Google Gemini AI • Ask anything about workout, diet & recovery
            </p>
          </div>
        </div>

        <AIPulse label="Gemini 2.5" size="sm" />
      </div>

      <MedicalDisclaimer compact />

      {/* Suggestion Chips */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sug)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-bold text-xs shrink-0 shadow-xs hover:bg-blue-50/50 transition-all flex items-center gap-1.5"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{sug}</span>
          </button>
        ))}
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Scroll View */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-1 shadow-xs">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                )}

                <div
                  className={`p-4 max-w-lg text-xs sm:text-sm space-y-1 shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-none font-medium'
                      : 'bg-emerald-50/80 border border-emerald-200/80 text-slate-800 rounded-2xl rounded-tl-none font-normal leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className={`text-[10px] block text-right font-medium ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 mt-1 shadow-xs">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl rounded-tl-none text-xs text-slate-600 font-semibold flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>FitBuddy AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach about exercises, macros, or recovery..."
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default AIAssistantPage;
