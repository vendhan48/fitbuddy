import React, { createContext, useContext, useState } from 'react';
import type { FitnessPlan, FitnessProfile, ProgressLog } from '../types';
import { fitnessAPI } from '../services/api';
import { storage } from '../utils/storage';

export type TabType =
  | 'landing'
  | 'dashboard'
  | 'profile'
  | 'plan-generator'
  | 'workout'
  | 'nutrition'
  | 'progress'
  | 'ai-assistant';

interface AppContextType {
  profile: FitnessProfile | null;
  plan: FitnessPlan | null;
  progressLogs: ProgressLog[];
  activeTab: TabType;
  loading: boolean;
  setActiveTab: (tab: TabType) => void;
  updateProfile: (data: Partial<FitnessProfile>) => Promise<boolean>;
  generateNewPlan: (profileData?: Partial<FitnessProfile>) => Promise<boolean>;
  setPlan: React.Dispatch<React.SetStateAction<FitnessPlan | null>>;
  addProgressLog: (log: ProgressLog) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedProfile = storage.getProfile();
  const savedPlan = storage.getPlan();
  const [profile, setProfile] = useState<FitnessProfile | null>(savedProfile);
  const [plan, setPlanState] = useState<FitnessPlan | null>(savedPlan);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>(storage.getProgress());
  const [activeTab, setActiveTabState] = useState<TabType>(
    savedPlan ? 'dashboard' : savedProfile ? 'profile' : 'landing'
  );
  const [loading] = useState(false);

  const setActiveTab = (tab: TabType) => setActiveTabState(tab);

  const setPlan: React.Dispatch<React.SetStateAction<FitnessPlan | null>> = (value) => {
    setPlanState((current) => {
      const next = typeof value === 'function' ? value(current) : value;
      storage.setPlan(next);
      return next;
    });
  };

  const updateProfile = async (data: Partial<FitnessProfile>): Promise<boolean> => {
    const next = { ...profile, ...data } as FitnessProfile;
    setProfile(next);
    storage.setProfile(next);
    return true;
  };

  const generateNewPlan = async (profileData?: Partial<FitnessProfile>): Promise<boolean> => {
    const targetProfile = { ...profile, ...profileData } as FitnessProfile;
    if (!targetProfile.goal) return false;

    setProfile(targetProfile);
    storage.setProfile(targetProfile);
    try {
      const response = await fitnessAPI.generatePlan(targetProfile);
      if (!response.data?.plan) return false;
      setPlan(response.data.plan);
      return true;
    } catch (error) {
      console.error('Generate plan error:', error);
      return false;
    }
  };

  const addProgressLog = (log: ProgressLog) => {
    setProgressLogs((current) => {
      const next = [...current, log];
      storage.setProgress(next);
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        plan,
        progressLogs,
        activeTab,
        loading,
        setActiveTab,
        updateProfile,
        generateNewPlan,
        setPlan,
        addProgressLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};