const { GoogleGenAI } = require('@google/genai');

// Helper to sanitize & extract JSON from Gemini text response
function cleanAndParseJSON(text) {
  try {
    let clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('Failed to parse AI JSON:', err.message);
    return null;
  }
}

// Smart default plan generator fallback
function buildFallbackPlan(profile) {
  const days = profile.workoutDays || 4;
  const goal = profile.goal || 'General Fitness';
  const duration = profile.workoutDuration || 45;
  const equipment = profile.equipment || 'Dumbbells, Bodyweight';
  const diet = profile.dietaryPreference || 'Balanced High Protein';

  const dayTemplates = [
    {
      day: 'Day 1: Upper Body Push & Core',
      focus: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'ex-101', name: 'Barbell/Dumbbell Bench Press', sets: 4, reps: '8-12', rest: '90 sec', duration: '10 mins', instructions: 'Keep shoulder blades retracted and press smoothly upward.', completed: false },
        { id: 'ex-102', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60 sec', duration: '8 mins', instructions: 'Set bench to 30 degrees. Focus on upper chest squeeze.', completed: false },
        { id: 'ex-103', name: 'Overhead Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60 sec', duration: '8 mins', instructions: 'Keep core engaged and press vertical without arching back.', completed: false },
        { id: 'ex-104', name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', rest: '45 sec', duration: '6 mins', instructions: 'Flare rope out at the bottom of the movement for maximum tricep activation.', completed: false },
        { id: 'ex-105', name: 'Hanging Leg Raises / Plank', sets: 3, reps: '15 reps / 45s', rest: '45 sec', duration: '6 mins', instructions: 'Control movement without swinging.', completed: false },
      ]
    },
    {
      day: 'Day 2: Lower Body & Glute Focus',
      focus: 'Quads, Hamstrings, Glutes',
      exercises: [
        { id: 'ex-201', name: 'Barbell Back Squats / Goblet Squats', sets: 4, reps: '8-10', rest: '90 sec', duration: '12 mins', instructions: 'Drive knees outward and keep chest upright throughout.', completed: false },
        { id: 'ex-202', name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: '90 sec', duration: '10 mins', instructions: 'Hinge at hips, keep back straight, feel stretch in hamstrings.', completed: false },
        { id: 'ex-203', name: 'Walking Dumbbell Lunges', sets: 3, reps: '12 per leg', rest: '60 sec', duration: '8 mins', instructions: 'Step forward firmly, keep front knee behind toes.', completed: false },
        { id: 'ex-204', name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45 sec', duration: '6 mins', instructions: 'Pause for 1s at top contraction.', completed: false },
      ]
    },
    {
      day: 'Day 3: Active Recovery & Mobility',
      focus: 'Cardio & Flexibility',
      exercises: [
        { id: 'ex-301', name: 'Brisk Incline Walk / Light Jog', sets: 1, reps: '30 mins', rest: 'N/A', duration: '30 mins', instructions: 'Keep heart rate in Zone 2 (conversational pace).', completed: false },
        { id: 'ex-302', name: 'Full Body Dynamic Mobility Flow', sets: 2, reps: '10 mins', rest: '60 sec', duration: '10 mins', instructions: 'Perform hip openers, thoracic spine rotations, and hamstring stretches.', completed: false },
      ]
    },
    {
      day: 'Day 4: Upper Body Pull & Rear Delts',
      focus: 'Back, Biceps, Rear Delts',
      exercises: [
        { id: 'ex-401', name: 'Lat Pulldowns / Pull-Ups', sets: 4, reps: '8-12', rest: '90 sec', duration: '10 mins', instructions: 'Pull elbows down toward hips and squeeze lats at bottom.', completed: false },
        { id: 'ex-402', name: 'Seated Cable Rows / Dumbbell Rows', sets: 3, reps: '10-12', rest: '60 sec', duration: '8 mins', instructions: 'Keep torso still and drive elbows back.', completed: false },
        { id: 'ex-403', name: 'Face Pulls for Shoulder Health', sets: 3, reps: '15', rest: '45 sec', duration: '6 mins', instructions: 'Pull rope toward upper nose, rotating shoulders outward.', completed: false },
        { id: 'ex-404', name: 'Incline Dumbbell Bicep Curls', sets: 3, reps: '12', rest: '45 sec', duration: '6 mins', instructions: 'Keep upper arm stationary and squeeze biceps at top.', completed: false },
      ]
    },
    {
      day: 'Day 5: Full Body HIIT & Core',
      focus: 'Conditioning & Stamina',
      exercises: [
        { id: 'ex-501', name: 'Kettlebell Swings / Dumbbell Swings', sets: 4, reps: '15', rest: '45 sec', duration: '8 mins', instructions: 'Power move driven by hip hinge, not arm lifting.', completed: false },
        { id: 'ex-502', name: 'Dumbbell Thrusters', sets: 3, reps: '12', rest: '60 sec', duration: '8 mins', instructions: 'Full squat directly into overhead press in one fluid motion.', completed: false },
        { id: 'ex-503', name: 'Mountain Climbers & Russian Twists', sets: 3, reps: '45s each', rest: '30 sec', duration: '8 mins', instructions: 'High intensity core burner.', completed: false },
      ]
    }
  ];

  return {
    title: `AI ${goal} Blueprint`,
    workoutPlan: dayTemplates.slice(0, Math.min(days, 5)),
    nutritionPlan: {
      breakfast: diet.includes('High Protein') 
        ? '3 Scrambled Eggs with spinach, 2 slices of whole grain toast, and 1 apple.' 
        : 'Oatmeal bowl topped with berries, chia seeds, sliced almonds, and a scoop of protein powder.',
      lunch: 'Grilled chicken breast or tofu (200g) with quinoa, roasted sweet potatoes, and steamed broccoli drizzled with olive oil.',
      dinner: 'Pan-seared salmon fillet or lentil curry with brown rice, mixed green salad, and asparagus.',
      snacks: 'Greek yogurt with honey, hand full of walnuts, or whey protein shake with banana.',
      hydration: 'Drink 3.5 to 4 Liters of water daily. Hydrate continuously before, during, and after workouts.',
      completedMeals: []
    },
    dailyRoutine: {
      warmup: '5-10 minutes of dynamic warm-up (arm circles, leg swings, hip openers, light cardio).',
      workout: `Execute target session within ${duration} minutes, maintaining proper form and controlled tempo.`,
      cooldown: '5-10 minutes of static stretching focusing on trained muscle groups.',
      recovery: 'Aim for 7-9 hours of restful sleep daily. Prioritize hydration and electrolyte intake.'
    },
    recommendations: [
      `Progressive Overload: Gradually increase weight or repetitions every week to match your goal: ${goal}.`,
      `Nutrition Sync: Consume 1.6g - 2.2g of protein per kg of body weight for optimal recovery.`,
      `Rest & Recovery: Allow at least 48 hours of recovery before targeting the same muscle group again.`,
      `Consistency over Intensity: Stick to your ${days}-day schedule for sustainable long-term progress.`,
      `Safety First: Always prioritize pristine movement technique over heavier weight.`
    ]
  };
}

async function generateFitnessPlan(profile) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('[Gemini AI] No API key set in .env. Using smart AI plan generator.');
    return buildFallbackPlan(profile);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
You are an elite AI personal trainer and certified nutritionist.
Generate a structured personalized fitness and nutrition plan for this user:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height} cm
- Weight: ${profile.weight} kg
- Fitness Goal: ${profile.goal}
- Activity Level: ${profile.activityLevel}
- Experience: ${profile.experience}
- Days Per Week: ${profile.workoutDays}
- Workout Duration: ${profile.workoutDuration} minutes per session
- Location: ${profile.preferredLocation}
- Equipment Available: ${profile.equipment}
- Dietary Preference: ${profile.dietaryPreference}

Respond strictly with a valid JSON object only. Do NOT include markdown code blocks, backticks, or any non-JSON text.
JSON Structure MUST be:
{
  "title": "string",
  "workoutPlan": [
    {
      "day": "Day 1: Title",
      "focus": "Target muscles",
      "exercises": [
        {
          "id": "unique_string",
          "name": "Exercise Name",
          "sets": 4,
          "reps": "8-12",
          "rest": "60 sec",
          "duration": "10 mins",
          "instructions": "Brief form tip",
          "completed": false
        }
      ]
    }
  ],
  "nutritionPlan": {
    "breakfast": "string",
    "lunch": "string",
    "dinner": "string",
    "snacks": "string",
    "hydration": "string",
    "completedMeals": []
  },
  "dailyRoutine": {
    "warmup": "string",
    "workout": "string",
    "cooldown": "string",
    "recovery": "string"
  },
  "recommendations": ["string", "string", "string", "string"]
}
Generate ${profile.workoutDays} workout days in workoutPlan array. Keep exercises realistic and safe.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    const parsed = cleanAndParseJSON(text);
    if (parsed && parsed.workoutPlan) {
      return parsed;
    }
    console.warn('[Gemini AI] Failed to parse API JSON response. Using intelligent fallback.');
    return buildFallbackPlan(profile);
  } catch (error) {
    console.error('[Gemini AI Error]:', error.message);
    return buildFallbackPlan(profile);
  }
}

async function chatWithAI(message, history = [], userProfile = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  const disclaimer = "\n\n*FitBuddy provides general fitness and wellness guidance and is not a substitute for professional medical advice.*";

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    // Smart contextual responses for demo/offline mode
    const msgLower = message.toLowerCase();
    let reply = "";
    if (msgLower.includes('beginner') || msgLower.includes('start')) {
      reply = "For beginners, consistency and proper form are key! Start with 3 full-body sessions per week focusing on compound movements like squats, push-ups, dumbbell rows, and planks. Keep workouts to 30-45 minutes and prioritize rest days.";
    } else if (msgLower.includes('meal') || msgLower.includes('diet') || msgLower.includes('food') || msgLower.includes('eat')) {
      reply = "A balanced fitness diet should combine lean proteins (chicken, eggs, tofu, fish), complex carbohydrates (brown rice, oats, sweet potatoes), healthy fats (avocado, nuts, olive oil), and plenty of colorful vegetables. Drink at least 3-4 liters of water daily!";
    } else if (msgLower.includes('home') || msgLower.includes('no equipment')) {
      reply = "Home workouts can be extremely effective! You can target every muscle group using bodyweight exercises: Bodyweight Squats, Lunges, Push-ups, Chair Dips, Glute Bridges, Mountain Climbers, and Planks. Perform 3-4 sets of 12-15 reps per exercise.";
    } else if (msgLower.includes('routine') || msgLower.includes('improve')) {
      reply = "To take your routine to the next level: 1) Implement progressive overload (increase weight/reps gradually), 2) Track your workouts consistently, 3) Ensure 7-9 hours of quality sleep for muscular repair, and 4) Deload every 6-8 weeks to prevent burnout.";
    } else {
      reply = `Great question! When aiming for your goal (${userProfile?.goal || 'General Fitness'}), focus on maintaining a structured workout plan, balancing your macronutrients, staying well hydrated, and giving your body sufficient rest between intense training sessions.`;
    }
    return reply + disclaimer;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const profileText = userProfile 
      ? `User Profile context: Goal: ${userProfile.goal}, Experience: ${userProfile.experience}, Weight: ${userProfile.weight}kg, Height: ${userProfile.height}cm.`
      : '';

    const systemPrompt = `
You are Ask FitBuddy AI, a friendly, encouraging, and highly certified fitness and nutrition assistant.
${profileText}
Guidelines:
- Provide concise, structured, practical, and safe fitness advice.
- Avoid extreme caloric restrictions, dangerous heavy lifts without warmups, or medical diagnoses.
- Keep responses encouraging and easy to read with bullet points when appropriate.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\nUser Query: ${message}`,
    });

    return (response.text || "I'm here to help you reach your fitness goals! What specific advice can I provide today?") + disclaimer;
  } catch (error) {
    console.error('[Gemini Chat Error]:', error.message);
    return `FitBuddy AI is currently optimizing! Here is standard guidance: Focus on hydration, 7-8 hours of sleep, progressive overload, and balanced nutrition tailored to your daily energy needs.${disclaimer}`;
  }
}

module.exports = {
  generateFitnessPlan,
  chatWithAI,
  buildFallbackPlan,
};
