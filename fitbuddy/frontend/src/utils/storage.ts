import type { FitnessPlan, FitnessProfile, ProgressLog } from '../types';

const STORAGE_KEYS = {
  profile: 'fitbuddy_profile',
  plan: 'fitbuddy_plan',
  progress: 'fitbuddy_progress',
  preferences: 'fitbuddy_preferences',
} as const;

function readValue<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save FitBuddy data for ${key}`, error);
  }
}

export const storage = {
  getProfile: () => readValue<FitnessProfile | null>(STORAGE_KEYS.profile, null),
  setProfile: (profile: FitnessProfile) => writeValue(STORAGE_KEYS.profile, profile),
  getPlan: () => readValue<FitnessPlan | null>(STORAGE_KEYS.plan, null),
  setPlan: (plan: FitnessPlan | null) => writeValue(STORAGE_KEYS.plan, plan),
  getProgress: () => readValue<ProgressLog[]>(STORAGE_KEYS.progress, []),
  setProgress: (progress: ProgressLog[]) => writeValue(STORAGE_KEYS.progress, progress),
  getPreferences: <T,>(fallback: T) => readValue<T>(STORAGE_KEYS.preferences, fallback),
  setPreferences: <T,>(preferences: T) => writeValue(STORAGE_KEYS.preferences, preferences),
};