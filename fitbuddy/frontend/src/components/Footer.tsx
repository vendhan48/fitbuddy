import React from 'react';
import { Activity, Sparkles, Heart, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAuth();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform relative">
                <Activity className="w-5 h-5 text-white stroke-[2.5]" />
                <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Fit<span className="gradient-text-blue-green">Buddy</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong className="text-slate-200">“Train Smarter. Live Better.”</strong><br />
              Your Personal AI Fitness Companion. Intelligent workout schedules, macro guidance, and goal tracking.
            </p>
          </div>

          {/* Core Product Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Features</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('plan-generator')} className="hover:text-emerald-400 transition-colors">AI Plan Generator</button></li>
              <li><button onClick={() => setActiveTab('workout')} className="hover:text-emerald-400 transition-colors">Interactive Workout Tracker</button></li>
              <li><button onClick={() => setActiveTab('nutrition')} className="hover:text-emerald-400 transition-colors">Smart Nutrition & Hydration</button></li>
              <li><button onClick={() => setActiveTab('ai-assistant')} className="hover:text-emerald-400 transition-colors">Ask FitBuddy AI Coach</button></li>
            </ul>
          </div>

          {/* User Section */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Command Center</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-400 transition-colors">Dashboard Overview</button></li>
              <li><button onClick={() => setActiveTab('profile')} className="hover:text-blue-400 transition-colors">Fitness Profile Setup</button></li>
              <li><button onClick={() => setActiveTab('progress')} className="hover:text-blue-400 transition-colors">Body Metrics & Intelligence</button></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Technology</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Built with React 19, TypeScript, Tailwind CSS, Node.js Express API, and Google Gemini AI Engine.
            </p>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-800/80 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-slate-400 text-[11px] leading-relaxed">
            <strong className="text-slate-200">Medical Disclaimer:</strong> FitBuddy provides general fitness and wellness guidance and is not a substitute for professional medical advice. Always consult a qualified healthcare professional before beginning any exercise or diet program.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
          <p>© {new Date().getFullYear()} FitBuddy AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Powered by <span className="font-bold text-emerald-400">FitBuddy AI Pulse</span>
              <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
