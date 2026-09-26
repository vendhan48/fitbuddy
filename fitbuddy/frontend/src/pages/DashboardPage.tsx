import React, { useState } from 'react';
import { 
  Dumbbell, 
  TrendingUp, 
  Bot, 
  Droplets, 
  Clock, 
  ArrowRight,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';
import AIPulse from '../components/AIPulse';

export const DashboardPage: React.FC = () => {
  const { profile, plan, setActiveTab } = useApp();
  const [weeklyData] = useState<any[]>([
    { day: 'Mon', duration: 45 },
    { day: 'Tue', duration: 50 },
    { day: 'Wed', duration: 0 },
    { day: 'Thu', duration: 45 },
    { day: 'Fri', duration: 40 },
    { day: 'Sat', duration: 30 },
    { day: 'Sun', duration: 0 },
  ]);

  const todayWorkout = plan?.workoutPlan?.[0] || {
    day: 'Day 1: Upper Body Focus',
    focus: 'Chest, Shoulders & Arms',
    exercises: [
      { id: '1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', completed: true },
      { id: '2', name: 'Incline Dumbbell Flyes', sets: 3, reps: '10-12', completed: true },
      { id: '3', name: 'Lat Pulldowns', sets: 4, reps: '10-12', completed: false },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Welcome Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Your Fitness Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Ready to make progress today? Here is your Fitness Command Center.
          </p>
        </div>

        <button onClick={() => setActiveTab('profile')} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold">Fitness Profile</button>
      </div>

      {/* DASHBOARD HERO CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200/80 relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 max-w-xl">
            <AIPulse label="Weekly Progress Intelligence" size="sm" />
            
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Your Weekly Goal
              </h2>
              <span className="text-3xl sm:text-4xl font-extrabold gradient-text-blue-green">
                82%
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-600">
              <strong className="text-slate-900 font-extrabold">4 / 5 workouts completed</strong> • 1 workout left to complete your weekly goal.
            </p>

            {/* Blue -> Green Gradient Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: '82%' }}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setActiveTab('workout')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 group"
            >
              <span>View Workout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* 4 PREMIUM STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Current Goal */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-3 hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Goal</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900 truncate">
              {profile?.goal || 'General Fitness'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Personalized Blueprint</p>
          </div>
        </div>

        {/* Card 2: Workout Streak */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-3 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Workout Streak</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              🔥 4 Days
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Personal Record!</p>
          </div>
        </div>

        {/* Card 3: Weekly Activity */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-3 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Activity</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              4h 25m
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Across 4 sessions</p>
          </div>
        </div>

        {/* Card 4: Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-3 hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Progress Rate</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-emerald-600">
              +12%
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Vs. previous month</p>
          </div>
        </div>

      </div>

      {/* TODAY'S OVERVIEW & WEEKLY CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Overview */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Session</h3>
                <p className="text-xs text-slate-500">{todayWorkout.day}</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full">
              66% Done
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Workout Focus</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{todayWorkout.focus || 'Full Body'}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase block">Est. Time</span>
                <p className="text-xs font-bold text-blue-600 flex items-center gap-1 justify-end mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {profile?.workoutDuration || 45} Mins
                </p>
              </div>
            </div>

            {/* Water Tracker Callout */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Water Target</h5>
                  <p className="text-xs text-slate-600">3.5 / 4.0 Litres logged</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold shadow-xs transition-colors"
              >
                Log Water
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveTab('workout')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Go to Workout Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Weekly Minutes
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Active Time</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Bar dataKey="duration" name="Minutes" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* QUICK ACTION TILES */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Command Actions</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('plan-generator')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">AI Plan Generator</h4>
            <p className="text-[11px] text-slate-500">Synthesize routine</p>
          </button>

          <button
            onClick={() => setActiveTab('workout')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">My Workout</h4>
            <p className="text-[11px] text-slate-500">Track exercises</p>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/40 text-left transition-all group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-600">Track Progress</h4>
            <p className="text-[11px] text-slate-500">Log body metrics</p>
          </button>

          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-400 hover:bg-purple-50/40 text-left transition-all group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600">Ask AI Coach</h4>
            <p className="text-[11px] text-slate-500">Instant answers</p>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
