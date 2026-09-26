import React, { useState } from 'react';
import { 
  Dumbbell, 
  CheckCircle2, 
  Clock, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AIPulse from '../components/AIPulse';

export const WorkoutPage: React.FC = () => {
  const { plan, setPlan, setActiveTab } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const workoutDays = plan?.workoutPlan || [];

  const currentDay = workoutDays[selectedDayIndex] || workoutDays[0];
  
  const toggleExercise = (exerciseId: string) => {
    setPlan((current) => current ? {
      ...current,
      workoutPlan: current.workoutPlan.map((day, dayIndex) => dayIndex === selectedDayIndex
        ? { ...day, exercises: day.exercises.map((exercise) => exercise.id === exerciseId
          ? { ...exercise, completed: !exercise.completed }
          : exercise) }
        : day),
    } : current);
  };

  const totalExercises = currentDay?.exercises?.length || 0;
  const completedCount = currentDay?.exercises?.filter((exercise) => exercise.completed).length || 0;
  const completionPercentage = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {!currentDay && (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80">
          <h1 className="text-2xl font-extrabold text-slate-900">Your workout plan is ready to create</h1>
          <button onClick={() => setActiveTab('profile')} className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold">Set Up Fitness Profile</button>
        </div>
      )}
      {currentDay && <>
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <AIPulse label="Active Session Tracker" size="sm" />
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Workout Execution
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Track sets, rest times, and mark exercises complete in real-time.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('progress')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <span>Log Completed Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
        {workoutDays.map((dayItem, idx) => {
          const isActive = idx === selectedDayIndex;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <Dumbbell className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span>{dayItem.day}</span>
            </button>
          );
        })}
      </div>

      {/* SESSION SUMMARY CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block">Target Focus</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{currentDay.focus}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>~45 Mins</span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{completedCount} / {totalExercises} Done</span>
            </div>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-600">Session Progress</span>
            <span className="text-emerald-600">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* EXERCISE CARDS LIST */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Prescribed Exercises ({currentDay.exercises?.length || 0})
        </h3>

        <div className="space-y-4">
          {currentDay.exercises?.map((exercise, idx) => {
            const isCompleted = !!exercise.completed;

            return (
              <div 
                key={exercise.id || idx}
                className={`p-6 rounded-3xl border transition-all duration-300 space-y-4 ${
                  isCompleted 
                    ? 'bg-emerald-50/60 border-emerald-200 shadow-soft-sm' 
                    : 'bg-white border-slate-200/80 shadow-soft-sm hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleExercise(exercise.id)}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                          : 'bg-white border-slate-300 text-transparent hover:border-emerald-500'
                      }`}
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">#0{idx + 1}</span>
                        <h4 className={`text-base font-extrabold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {exercise.name}
                        </h4>
                      </div>

                      {exercise.instructions && (
                        <p className="text-xs text-slate-500 mt-1 max-w-2xl font-normal leading-relaxed">
                          {exercise.instructions}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                      {exercise.sets} Sets
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60">
                      {exercise.reps}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exercise.rest || '60 sec'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      </>}
    </div>
  );
};

export default WorkoutPage;
