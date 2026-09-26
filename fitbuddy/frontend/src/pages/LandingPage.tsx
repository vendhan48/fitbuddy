import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  Bot, 
  Target, 
  Flame, 
  CheckCircle2, 
  Activity, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AIPulse from '../components/AIPulse';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();

  const features = [
    {
      icon: Dumbbell,
      title: 'AI Workout Planner',
      description: 'Personalized routines generated around your goals, schedule, and equipment.',
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      icon: Utensils,
      title: 'Smart Nutrition',
      description: 'Simple nutrition guidance designed around your lifestyle and dietary preference.',
      gradient: 'from-emerald-500 to-teal-400',
    },
    {
      icon: TrendingUp,
      title: 'Progress Intelligence',
      description: 'Understand your progress through meaningful insights, weight charts, and volume metrics.',
      gradient: 'from-blue-500 to-emerald-400',
    },
    {
      icon: Bot,
      title: 'AI Fitness Coach',
      description: 'Ask questions 24/7 and get instant fitness, recovery, and exercise guidance.',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Turn your fitness goals into measurable milestones with actionable targets.',
      gradient: 'from-emerald-600 to-green-400',
    },
    {
      icon: Flame,
      title: 'Daily Motivation',
      description: 'Build consistency with streaks, habit loops, and smart daily reminders.',
      gradient: 'from-amber-500 to-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/2" />
        
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Split: Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Badge */}
            <AIPulse label="✦ AI-Powered Fitness Platform" size="md" />

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Train <span className="gradient-text-blue-green">Smarter.</span><br />
              Live Better.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
              FitBuddy creates personalized workout and wellness plans using AI, built around your goals, routine and lifestyle.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-emerald-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Create My Fitness Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:text-slate-900 font-bold text-base shadow-xs hover:bg-slate-100/60 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore FitBuddy</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Guesswork</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Google Gemini Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Free Setup</span>
              </div>
            </div>

          </div>

          {/* Right Split: Floating Dashboard Preview Visual */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Floating Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200/80 space-y-6 relative z-10 transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Weekly Goal Progress</h3>
                    <p className="text-xs text-slate-400">Target: Hypertrophy & Fitness</p>
                  </div>
                </div>
                <AIPulse label="AI Active" size="sm" showSparkle={false} />
              </div>

              {/* Progress Bar & Stat */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">Overall Routine Completion</span>
                  <span className="text-emerald-600 font-extrabold text-sm">82%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500" style={{ width: '82%' }} />
                </div>
              </div>

              {/* AI Highlight Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-900 font-medium leading-tight">
                  <strong className="font-bold">AI Insight:</strong> Upper Body volume optimal today. Recommended rest period: 60 sec.
                </p>
              </div>

              {/* Mini Workout Checklist */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Exercises (2/3 Completed)</span>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-800 line-through">Barbell Bench Press</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">4 Sets</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-800 line-through">Incline Dumbbell Flyes</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">3 Sets</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-xs font-bold text-slate-900">Lat Pulldowns</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200">Next</span>
                </div>
              </div>

            </div>

            {/* Floating Mini Card 1: Streak */}
            <div className="absolute -top-6 -left-6 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-slate-200/80 flex items-center gap-3 z-20 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Streak</span>
                <span className="text-sm font-extrabold text-slate-900">🔥 4 Day Streak</span>
              </div>
            </div>

            {/* Floating Mini Card 2: Weekly Goal */}
            <div className="absolute -bottom-6 -right-6 sm:-right-8 bg-white p-3.5 rounded-2xl shadow-soft-lg border border-slate-200/80 flex items-center gap-3 z-20 animate-float-reverse">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Weekly Target</span>
                <span className="text-sm font-extrabold text-emerald-600">✓ 82% Completed</span>
              </div>
            </div>

            {/* Floating Mini Card 3: AI Plan Ready */}
            <div className="absolute top-1/2 -right-10 hidden sm:flex bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-3 rounded-2xl shadow-glow-blue items-center gap-2 z-20 animate-float-slow">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold">✦ AI Plan Ready</span>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white border-t border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <AIPulse label="Core Capabilities" size="sm" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Stay on Track
            </h2>
            <p className="text-slate-600 text-base">
              Engineered with artificial intelligence to optimize every aspect of your workout and diet routine.
            </p>
          </div>

          {/* 6 Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 relative space-y-4 hover:border-blue-300/80"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <AIPulse label="Simple Workflow" size="sm" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How FitBuddy Works
            </h2>
            <p className="text-slate-600 text-base">
              Get your custom AI workout blueprint in less than 2 minutes.
            </p>
          </div>

          {/* Connected 3 Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Connecting Line behind steps on desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-1 bg-gradient-to-r from-blue-600 via-emerald-400 to-blue-600 -translate-y-1/2 z-0 rounded-full opacity-30" />

            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm relative z-10 space-y-4 text-center group hover:border-blue-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tell Us About You</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your fitness goals, activity level, location, available equipment, and diet preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm relative z-10 space-y-4 text-center group hover:border-emerald-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Builds Your Plan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FitBuddy AI analyzes your information and creates a personalized workout & nutrition blueprint.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm relative z-10 space-y-4 text-center group hover:border-teal-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Track & Improve</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow your routine, mark completed exercises, track body metrics, and chat with your AI coach.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MEET YOUR AI FITNESS COACH SECTION */}
      <section className="py-20 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <AIPulse label="Intelligent Assistant" size="md" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet Your AI Fitness Coach
            </h2>
            <p className="text-slate-600 text-base">
              Get instant, science-backed exercise adaptations and nutritional advice 24/7.
            </p>
          </div>

          {/* AI Interface Preview Card */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-transparent bg-gradient-to-r from-blue-600/30 via-emerald-500/30 to-blue-600/30 p-[2px]">
            <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 space-y-6 text-white">
              
              {/* Top AI Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      FitBuddy AI Coach
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online & Ready
                    </span>
                  </div>
                </div>
                
                <AIPulse label="Gemini 2.5 Flash" size="sm" />
              </div>

              {/* Chat Interaction Simulation */}
              <div className="space-y-4">
                
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-md text-xs sm:text-sm font-medium shadow-md">
                    "I only have 30 minutes today. What should I do for maximum upper body results?"
                  </div>
                </div>

                {/* AI Response Card */}
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-1 font-bold">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl rounded-tl-none max-w-xl text-xs sm:text-sm text-slate-200 space-y-3">
                    <p className="leading-relaxed">
                      Based on your goal, here's a focused <strong>30-minute High-Efficiency Upper Body Routine</strong> with minimal rest intervals:
                    </p>

                    {/* Suggested Exercise Mini Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-blue-400 block">1. Bench Press</span>
                        <span className="text-[11px] text-slate-400">4 Sets × 8 Reps</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-emerald-400 block">2. Dumbbell Rows</span>
                        <span className="text-[11px] text-slate-400">3 Sets × 10 Reps</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-amber-400 block">3. Push-up Finisher</span>
                        <span className="text-[11px] text-slate-400">2 Sets to Failure</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Call to Action inside preview */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Start Live Chat with FitBuddy AI</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Train Smarter & Live Better?
          </h2>

          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Join thousands of fitness enthusiasts leveraging Google Gemini AI for customized training routines.
          </p>

          <button
            onClick={() => setActiveTab('profile')}
            className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-base shadow-2xl transition-all inline-flex items-center gap-2 group"
          >
            <span>Create Your Free AI Plan Now</span>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
