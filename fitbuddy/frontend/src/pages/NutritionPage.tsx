import React, { useState } from 'react';
import { 
  Utensils, 
  Droplets, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Apple
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storage } from '../utils/storage';

export const NutritionPage: React.FC = () => {
  const { plan, setPlan } = useApp();
  
  const [waterLiters, setWaterLiters] = useState<number>(() => storage.getPreferences({ waterLiters: 0 }).waterLiters);
  const targetWater = 4.0;

  const completedMeals = plan?.nutritionPlan?.completedMeals || [];

  const toggleMeal = (mealKey: string) => {
    const updatedMeals = completedMeals.includes(mealKey)
      ? completedMeals.filter((meal) => meal !== mealKey)
      : [...completedMeals, mealKey];
    setPlan((current) => current ? {
      ...current,
      nutritionPlan: { ...current.nutritionPlan, completedMeals: updatedMeals },
    } : current);
  };

  const meals = [
    {
      key: 'breakfast',
      title: 'Breakfast',
      time: '08:00 AM',
      description: plan?.nutritionPlan?.breakfast || 'Oatmeal with protein powder, sliced banana, chia seeds, and almond butter.',
      calories: '450 kcal',
      protein: '32g Protein',
      carbs: '55g Carbs',
      fat: '12g Fat',
      color: 'from-amber-500 to-orange-400',
    },
    {
      key: 'lunch',
      title: 'Lunch',
      time: '01:00 PM',
      description: plan?.nutritionPlan?.lunch || 'Grilled chicken breast bowl with brown rice, steamed broccoli, and olive oil drizzle.',
      calories: '620 kcal',
      protein: '48g Protein',
      carbs: '65g Carbs',
      fat: '14g Fat',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      key: 'dinner',
      title: 'Dinner',
      time: '07:30 PM',
      description: plan?.nutritionPlan?.dinner || 'Baked salmon fillet with roasted sweet potatoes and fresh garden salad.',
      calories: '580 kcal',
      protein: '42g Protein',
      carbs: '45g Carbs',
      fat: '22g Fat',
      color: 'from-blue-600 to-indigo-500',
    },
    {
      key: 'snack',
      title: 'Snack / Post-Workout',
      time: '04:30 PM',
      description: plan?.nutritionPlan?.snacks || 'Greek yogurt with mixed berries and a scoop of whey protein.',
      calories: '260 kcal',
      protein: '25g Protein',
      carbs: '22g Carbs',
      fat: '4g Fat',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const handleWaterChange = (delta: number) => {
    const nextWaterLiters = Math.max(0, parseFloat((waterLiters + delta).toFixed(1)));
    setWaterLiters(nextWaterLiters);
    storage.setPreferences({ waterLiters: nextWaterLiters });
  };

  const waterPercentage = Math.min(100, Math.round((waterLiters / targetWater) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" /> Smart Nutrition & Hydration
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Nutrition Tracker
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Track daily macro goals, log meals, and maintain hydration targets.
          </p>
        </div>

        {/* Macro Summary Chip */}
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 flex items-center gap-3">
          <Apple className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Daily Target</span>
            <span className="text-sm font-extrabold text-slate-900">~1,910 Calories • 147g Protein</span>
          </div>
        </div>
      </div>

      {/* WATER HYDRATION COUNTER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Water Intake Tracker</h3>
              <p className="text-xs text-slate-500">Target: {targetWater} Litres daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleWaterChange(-0.25)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-xl font-extrabold text-blue-600 min-w-[80px] text-center">
              {waterLiters} L
            </span>

            <button
              onClick={() => handleWaterChange(0.25)}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-600">Hydration Progress</span>
            <span className="text-blue-600">{waterPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${waterPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* MEAL CARDS GRID */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Daily Meals & Micro Checklists
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal) => {
            const mealKey = meal.key === 'snack' ? 'snacks' : meal.key;
            const isDone = completedMeals.includes(mealKey);

            return (
              <div 
                key={meal.key}
                className={`p-6 rounded-3xl border transition-all duration-300 space-y-4 ${
                  isDone 
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-soft-sm' 
                    : 'bg-white border-slate-200/80 shadow-soft-sm hover:border-emerald-300'
                }`}
              >
                {/* Meal Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${meal.color} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{meal.title}</h4>
                      <span className="text-[11px] text-slate-400 font-semibold">{meal.time}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMeal(mealKey)}
                    className={`p-2 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-emerald-600'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {meal.description}
                </p>

                {/* Macro Chips */}
                <div className="flex items-center gap-2 text-[11px] font-bold pt-2 border-t border-slate-200/60">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    {meal.calories}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {meal.protein}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    {meal.carbs}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default NutritionPage;
