export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FitnessProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  activityLevel: string;
  experience: string;
  workoutDays: number;
  workoutDuration: number;
  preferredLocation: string;
  equipment: string;
  dietaryPreference: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  duration?: string;
  instructions?: string;
  completed?: boolean;
}

export interface DayWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface NutritionPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  hydration: string;
  completedMeals?: string[];
}

export interface DailyRoutine {
  warmup: string;
  workout: string;
  cooldown: string;
  recovery: string;
}

export interface FitnessPlan {
  _id?: string;
  title: string;
  workoutPlan: DayWorkout[];
  nutritionPlan: NutritionPlan;
  dailyRoutine: DailyRoutine;
  recommendations: string[];
  createdAt?: string;
}

export interface ProgressLog {
  _id?: string;
  weight: number;
  workoutCompleted: boolean;
  workoutTitle?: string;
  chest?: number;
  waist?: number;
  arms?: number;
  notes?: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
