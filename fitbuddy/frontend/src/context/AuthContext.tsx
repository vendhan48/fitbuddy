import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, FitnessProfile, FitnessPlan } from '../types';
import { authAPI, userAPI, fitnessAPI } from '../services/api';

type TabType = 'landing' | 'dashboard' | 'profile' | 'plan-generator' | 'workout' | 'nutrition' | 'progress' | 'ai-assistant' | 'login' | 'register';

interface AuthContextType {
  user: User | null;
  token: string | null;
  profile: FitnessProfile | null;
  plan: FitnessPlan | null;
  activeTab: TabType;
  loading: boolean;
  error: string | null;
  setActiveTab: (tab: TabType) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string, confirm: string) => Promise<boolean>;
  logout: () => void;
  fetchProfileAndPlan: () => Promise<void>;
  updateProfile: (data: Partial<FitnessProfile> & { name?: string }) => Promise<boolean>;
  generateNewPlan: (profileData?: Partial<FitnessProfile>) => Promise<boolean>;
  setPlan: React.Dispatch<React.SetStateAction<FitnessPlan | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('fitbuddy_token'));
  const [profile, setProfile] = useState<FitnessProfile | null>(null);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const savedToken = localStorage.getItem('fitbuddy_token');
      if (savedToken) {
        setToken(savedToken);
        try {
          await fetchProfileAndPlan();
        } catch (err) {
          console.warn('Could not load user data from API, using demo session.');
          setupDemoUser();
        }
      } else {
        setupDemoUser();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const setupDemoUser = () => {
    setUser({
      id: '650000000000000000000001',
      name: 'Vendhan',
      email: 'vendhan@fitbuddy.com',
    });
    setProfile({
      age: 26,
      gender: 'Male',
      height: 178,
      weight: 74,
      goal: 'General Fitness',
      activityLevel: 'Moderately Active',
      experience: 'Intermediate',
      workoutDays: 4,
      workoutDuration: 45,
      preferredLocation: 'Gym / Home',
      equipment: 'Dumbbells, Barbells, Cable Machines',
      dietaryPreference: 'High Protein / Balanced',
    });
    setPlan({
      title: 'AI General Fitness Blueprint',
      workoutPlan: [
        {
          day: 'Day 1: Upper Body Strength',
          focus: 'Chest, Back, Arms',
          exercises: [
            { id: 'ex-1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90 sec', duration: '10 mins', instructions: 'Maintain slight arch in lower back and press vertically.', completed: true },
            { id: 'ex-2', name: 'Incline Dumbbell Flyes', sets: 3, reps: '10-12', rest: '60 sec', duration: '8 mins', instructions: 'Stretch chest gently at bottom without overextending shoulders.', completed: true },
            { id: 'ex-3', name: 'Lat Pulldowns', sets: 4, reps: '10-12', rest: '60 sec', duration: '10 mins', instructions: 'Squeeze shoulder blades together at bottom of movement.', completed: false },
            { id: 'ex-4', name: 'Dumbbell Hammer Curls', sets: 3, reps: '12-15', rest: '45 sec', duration: '6 mins', instructions: 'Keep elbows tucked and avoid using momentum.', completed: false },
          ]
        },
        {
          day: 'Day 2: Lower Body & Core',
          focus: 'Quads, Hamstrings, Abs',
          exercises: [
            { id: 'ex-5', name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '90 sec', duration: '12 mins', instructions: 'Keep knees aligned over toes and descend to parallel.', completed: false },
            { id: 'ex-6', name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: '90 sec', duration: '10 mins', instructions: 'Hinge hips back and feel deep stretch in hamstrings.', completed: false },
            { id: 'ex-7', name: 'Plank Holds', sets: 3, reps: '60 sec', rest: '45 sec', duration: '5 mins', instructions: 'Maintain straight line from head to heels.', completed: false },
          ]
        },
        {
          day: 'Day 3: Active Recovery & Cardio',
          focus: 'Cardio & Flexibility',
          exercises: [
            { id: 'ex-8', name: 'Zone 2 Treadmill Walk', sets: 1, reps: '30 mins', rest: 'N/A', duration: '30 mins', instructions: 'Maintain steady pace at 120-130 bpm.', completed: false },
          ]
        },
        {
          day: 'Day 4: Full Body Functional',
          focus: 'Total Body',
          exercises: [
            { id: 'ex-9', name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '60 sec', duration: '8 mins', instructions: 'Drive movement from hips, keeping spine neutral.', completed: false },
            { id: 'ex-10', name: 'Dumbbell Push Press', sets: 3, reps: '12', rest: '60 sec', duration: '8 mins', instructions: 'Dip knees slightly and press overhead explosively.', completed: false },
          ]
        }
      ],
      nutritionPlan: {
        breakfast: '3 Scrambled Eggs with spinach, 2 slices whole wheat toast, 1 banana, and black coffee.',
        lunch: '200g Grilled Chicken Breast with 1 cup brown rice and steamed broccoli.',
        dinner: '200g Baked Salmon Fillet with sweet potato mash and asparagus.',
        snacks: '1 scoop Whey Protein with almond milk and a handful of almonds.',
        hydration: 'Drink 3.5 to 4 Liters of water daily.',
        completedMeals: ['breakfast', 'lunch']
      },
      dailyRoutine: {
        warmup: '5-10 minutes of dynamic warm-up (arm circles, leg swings, hip openers).',
        workout: 'Execute session in 45 minutes keeping rest intervals strict.',
        cooldown: '5-10 minutes of static stretching.',
        recovery: 'Aim for 8 hours of sleep and prioritize hydration.'
      },
      recommendations: [
        'Progressive Overload: Add weight or repetitions systematically.',
        'Protein Intake: Consume ~1.8g protein per kg of body weight.',
        'Hydration: Drink 500ml water immediately upon waking.',
        'Consistency: Stick to your scheduled workout days.'
      ]
    });
  };

  const fetchProfileAndPlan = async () => {
    try {
      const profileRes = await userAPI.getProfile();
      setUser(profileRes.data.user);
      setProfile(profileRes.data.profile);

      const planRes = await fitnessAPI.getPlan();
      if (planRes.data && planRes.data.plan) {
        setPlan(planRes.data.plan);
      }
    } catch (err: any) {
      console.error('Fetch profile/plan error:', err);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setError(null);
    try {
      const res = await authAPI.login({ email, password: pass });
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('fitbuddy_token', newToken);
      setToken(newToken);
      setUser(userData);
      await fetchProfileAndPlan();
      setActiveTab('dashboard');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(msg);
      return false;
    }
  };

  const register = async (name: string, email: string, pass: string, confirm: string): Promise<boolean> => {
    setError(null);
    try {
      const res = await authAPI.register({ name, email, password: pass, confirmPassword: confirm });
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('fitbuddy_token', newToken);
      setToken(newToken);
      setUser(userData);
      await fetchProfileAndPlan();
      setActiveTab('profile');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('fitbuddy_token');
    setToken(null);
    setUser(null);
    setProfile(null);
    setPlan(null);
    setActiveTab('landing');
  };

  const updateProfile = async (data: Partial<FitnessProfile> & { name?: string }): Promise<boolean> => {
    try {
      const res = await userAPI.updateProfile(data);
      if (res.data.profile) {
        setProfile(res.data.profile);
      }
      if (data.name && user) {
        setUser({ ...user, name: data.name });
      }
      return true;
    } catch (err: any) {
      console.error('Update profile error:', err);
      return false;
    }
  };

  const generateNewPlan = async (profileData?: Partial<FitnessProfile>): Promise<boolean> => {
    try {
      const targetData = profileData || profile || {};
      const res = await fitnessAPI.generatePlan(targetData);
      if (res.data && res.data.plan) {
        setPlan(res.data.plan);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Generate plan error:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        plan,
        activeTab,
        loading,
        error,
        setActiveTab,
        login,
        register,
        logout,
        fetchProfileAndPlan,
        updateProfile,
        generateNewPlan,
        setPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
