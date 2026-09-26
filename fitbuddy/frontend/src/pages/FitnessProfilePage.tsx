import React, { useState } from 'react';
import {
  Target,
  Save,
  CheckCircle2,
  Award,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AIPulse from '../components/AIPulse';

export const FitnessProfilePage: React.FC = () => {
  const { user, profile, updateProfile, setActiveTab } = useAuth();

  const [editing, setEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    age: profile?.age || 25,
    gender: profile?.gender || 'male',
    weight: profile?.weight || 75,
    height: profile?.height || 178,
    goal: profile?.goal || 'Build Muscle',
    activityLevel: profile?.activityLevel || 'moderately_active',
    experience: profile?.experience || 'intermediate',
    workoutDays: profile?.workoutDays || 4,
    workoutDuration: profile?.workoutDuration || 45,
    equipment: typeof profile?.equipment === 'string' ? profile.equipment : 'dumbbells, barbell',
    preferredLocation: profile?.preferredLocation || 'gym',
    dietaryPreference: profile?.dietaryPreference || 'high_protein',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setSuccessMsg('Profile updated successfully!');
    setEditing(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
            {user?.name?.[0]?.toUpperCase() || 'V'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user?.name || 'Vendhan'}
            </h1>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">
              {user?.email || 'vendhan@fitbuddy.com'} • Member since 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs shadow-xs hover:bg-slate-50 transition-colors"
          >
            {editing ? 'Cancel Editing' : 'Edit Fitness Profile'}
          </button>

          <button
            onClick={() => setActiveTab('plan-generator')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Plan</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* TWO-COLUMN LAYOUT ON DESKTOP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Quick Stats & Goals */}
        <div className="lg:col-span-4 space-y-6">

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" /> Primary Target
              </h3>
              <AIPulse label="Active" size="sm" showSparkle={false} />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Goal Strategy</span>
              <p className="text-base font-extrabold text-slate-900">{profile?.goal || 'Build Muscle'}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Activity Level:</span>
                <span className="font-bold text-slate-900 capitalize">{profile?.activityLevel?.replace('_', ' ') || 'Moderately Active'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Experience:</span>
                <span className="font-bold text-slate-900 capitalize">{profile?.experience || 'Intermediate'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Workout Frequency:</span>
                <span className="font-bold text-emerald-600">{profile?.workoutDays || 4} Days / Week</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-slate-900 capitalize">{profile?.preferredLocation || 'Gym'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Physical Metrics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Weight</span>
                <span className="text-lg font-extrabold text-slate-900">{profile?.weight || 75} kg</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Height</span>
                <span className="text-lg font-extrabold text-slate-900">{profile?.height || 178} cm</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Fitness Profile Parameters</h3>
              <p className="text-xs text-slate-500">Configure parameters used by Google Gemini AI to structure your workout routine</p>
            </div>
            <SlidersHorizontal className="w-5 h-5 text-slate-400" />
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Age</label>
                <input
                  type="number"
                  disabled={!editing}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                <input
                  type="number"
                  disabled={!editing}
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Fitness Goal</label>
                <select
                  disabled={!editing}
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-75"
                >
                  <option value="Weight Loss">Weight Loss & Fat Reduction</option>
                  <option value="Build Muscle">Build Muscle & Strength</option>
                  <option value="Endurance">Cardio & Endurance</option>
                  <option value="General Fitness">General Fitness & Mobility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Workout Days / Week</label>
                <select
                  disabled={!editing}
                  value={formData.workoutDays}
                  onChange={(e) => setFormData({ ...formData, workoutDays: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-75"
                >
                  <option value={3}>3 Days per week</option>
                  <option value={4}>4 Days per week</option>
                  <option value={5}>5 Days per week</option>
                  <option value={6}>6 Days per week</option>
                </select>
              </div>
            </div>

            {editing && (
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Parameters</span>
                </button>
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
};

export default FitnessProfilePage;
