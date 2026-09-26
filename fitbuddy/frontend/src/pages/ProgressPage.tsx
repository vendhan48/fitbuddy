import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Scale, 
  Plus, 
  Activity, 
  Loader2,
  Flame,
  Award,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import type { ProgressLog } from '../types';

export const ProgressPage: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  // Form State
  const [weight, setWeight] = useState<string>(profile?.weight ? profile.weight.toString() : '74');
  const [workoutCompleted, setWorkoutCompleted] = useState<boolean>(true);
  const [workoutTitle, setWorkoutTitle] = useState<string>('Upper Body Strength');
  const [notes, setNotes] = useState<string>('');

  const fetchLogs = async () => {
    try {
      const res = await progressAPI.getProgress();
      if (res.data && res.data.logs) {
        setLogs(res.data.logs);
      }
    } catch (err) {
      console.warn('Using demo progress data');
      const sampleLogs: ProgressLog[] = [
        { date: 'Sep 10', weight: 76.5, workoutCompleted: true },
        { date: 'Sep 12', weight: 76.0, workoutCompleted: true },
        { date: 'Sep 14', weight: 75.8, workoutCompleted: true },
        { date: 'Sep 16', weight: 75.2, workoutCompleted: true },
        { date: 'Sep 18', weight: 74.8, workoutCompleted: true },
        { date: 'Sep 20', weight: 74.5, workoutCompleted: true },
        { date: 'Sep 22', weight: 74.2, workoutCompleted: true },
        { date: 'Sep 24', weight: 74.0, workoutCompleted: true },
      ];
      setLogs(sampleLogs);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    setSubmitting(true);
    try {
      const res = await progressAPI.logProgress({
        weight: Number(weight),
        workoutCompleted,
        workoutTitle,
        notes,
      });

      if (res.data && res.data.progress) {
        await updateProfile({ weight: Number(weight) });
        await fetchLogs();
        setShowLogModal(false);
        setNotes('');
      }
    } catch (err) {
      console.error('Error adding log:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const chartData = logs.map(item => {
    const d = new Date(item.date);
    const dateStr = isNaN(d.getTime()) ? item.date : `${d.getMonth() + 1}/${d.getDate()}`;
    return {
      date: dateStr,
      weight: item.weight,
      workout: item.workoutCompleted ? 1 : 0,
    };
  });

  const latestWeight = logs.length > 0 ? logs[logs.length - 1].weight : (profile?.weight || 74);
  const initialWeight = logs.length > 0 ? logs[0].weight : 76.5;
  const weightChange = (latestWeight - initialWeight).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" /> Analytics & Intelligence
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Your Progress
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Track weight trends, workout frequency, and body metrics over time.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Progress Entry</span>
        </button>
      </div>

      {/* 4 STAT & CONSISTENCY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Weight Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Weight</span>
            <Scale className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">
            {latestWeight} <span className="text-xs font-medium text-slate-400">kg</span>
          </p>
          <p className="text-xs font-bold text-emerald-600">Change: {weightChange} kg</p>
        </div>

        {/* Workout Consistency */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Consistency Rate</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">
            92%
          </p>
          <p className="text-xs text-slate-500 font-medium">8 of 9 sessions logged</p>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">
            🔥 14 Days
          </p>
          <p className="text-xs font-bold text-emerald-600">Personal Best!</p>
        </div>

        {/* Target Goal */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Primary Goal</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-base font-extrabold text-slate-900 truncate">
            {profile?.goal || 'General Fitness'}
          </p>
          <p className="text-xs text-slate-500 font-medium">On track for Q4</p>
        </div>

      </div>

      {/* RECHARTS GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Weight Progress Line Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Weight Progress Trend (kg)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Last 30 Days</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  name="Weight (kg)"
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981' }} 
                  activeDot={{ r: 7 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity Bar Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Weekly Activity
            </h3>
            <span className="text-xs text-slate-400 font-medium">Session Status</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} ticks={[0, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Bar dataKey="workout" name="Session Done" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Entry History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Entry History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Workout Status</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.slice().reverse().map((log, idx) => {
                const dateVal = new Date(log.date);
                const displayDate = isNaN(dateVal.getTime()) ? log.date : dateVal.toLocaleDateString();

                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{displayDate}</td>
                    <td className="p-3 font-extrabold text-emerald-600">{log.weight} kg</td>
                    <td className="p-3">
                      {log.workoutCompleted ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold">
                          ✓ {log.workoutTitle || 'Routine'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">Rest Day</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 max-w-xs truncate">{log.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Progress Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" /> Log Progress Entry
              </h3>
              <button 
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="logWorkoutDone"
                  checked={workoutCompleted}
                  onChange={(e) => setWorkoutCompleted(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="logWorkoutDone" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Workout Completed Today
                </label>
              </div>

              {workoutCompleted && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Workout Title
                  </label>
                  <input
                    type="text"
                    value={workoutTitle}
                    onChange={(e) => setWorkoutTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Notes / Energy Level
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Felt great during bench press, energy was high..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-bold shadow-md hover:scale-105 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProgressPage;
