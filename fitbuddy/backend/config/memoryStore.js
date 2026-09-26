// Fallback in-memory state store when MongoDB is offline
const bcrypt = require('bcryptjs');

const memoryDb = {
  users: [],
  profiles: [],
  plans: [],
  progressLogs: [],
};

// Seed demo user "Vendhan"
(async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const demoUserId = '650000000000000000000001';

  memoryDb.users.push({
    _id: demoUserId,
    name: 'Vendhan',
    email: 'vendhan@fitbuddy.com',
    password: hashedPassword,
    createdAt: new Date(),
  });

  memoryDb.profiles.push({
    _id: '650000000000000000000002',
    userId: demoUserId,
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
    updatedAt: new Date(),
  });

  const demoPlan = {
    _id: '650000000000000000000003',
    userId: demoUserId,
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
      'Progressive Overload: Add 2.5kg to compound lifts every 2 weeks.',
      'Protein Intake: Consume ~150g protein per day across 4 meals.',
      'Hydration: Drink 500ml water immediately upon waking.',
      'Sleep Hygiene: Avoid screens 30 minutes before bedtime.'
    ],
    createdAt: new Date(),
  };

  memoryDb.plans.push(demoPlan);

  // Demo progress history
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 2);
    memoryDb.progressLogs.push({
      _id: `prog-${i}`,
      userId: demoUserId,
      weight: 76.5 - (6 - i) * 0.4,
      workoutCompleted: true,
      workoutTitle: i % 2 === 0 ? 'Upper Body Strength' : 'Lower Body & Core',
      notes: 'Felt strong, good energy throughout session.',
      date: d,
    });
  }
})();

module.exports = memoryDb;
