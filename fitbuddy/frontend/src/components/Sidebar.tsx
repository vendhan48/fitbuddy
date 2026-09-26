import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  Bot, 
  User as UserIcon, 
  Activity, 
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workout' as const, label: 'My Workout', icon: Dumbbell },
    { id: 'nutrition' as const, label: 'Nutrition', icon: Utensils },
    { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
    { id: 'ai-assistant' as const, label: 'AI Coach', icon: Bot, isAI: true },
    { id: 'plan-generator' as const, label: 'My Plan', icon: Activity },
    { id: 'profile' as const, label: 'Fitness Profile', icon: UserIcon },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200/80 flex-col justify-between shrink-0 h-screen sticky top-0 shadow-sm z-30">
        
        {/* Top Header & Navigation */}
        <div className="p-6 space-y-6">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform relative">
              <Activity className="w-5 h-5 text-white stroke-[2.5]" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Fit<span className="gradient-text-blue-green">Buddy</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider -mt-1">
                Fitness Command
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-xs transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {item.isAI && (
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/20'
                    }`}>
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button onClick={() => setActiveTab('profile')} className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200/60 text-slate-700 text-xs font-semibold flex items-center gap-2 hover:border-blue-300">
            <UserIcon className="w-4 h-4 text-blue-600" /> Fitness Profile
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Floating Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 scale-110' : ''}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
