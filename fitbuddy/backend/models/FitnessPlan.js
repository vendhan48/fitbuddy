const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  rest: { type: String, required: true },
  duration: { type: String, default: '10 mins' },
  instructions: { type: String, default: '' },
  completed: { type: Boolean, default: false },
});

const dayWorkoutSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g. "Day 1: Upper Body Focus"
  focus: { type: String, default: 'Full Body' },
  exercises: [exerciseSchema],
});

const fitnessPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, default: 'AI Personalized Fitness Plan' },
  workoutPlan: [dayWorkoutSchema],
  nutritionPlan: {
    breakfast: { type: String, default: '' },
    lunch: { type: String, default: '' },
    dinner: { type: String, default: '' },
    snacks: { type: String, default: '' },
    hydration: { type: String, default: 'Drink 3-4 liters of water daily.' },
    completedMeals: { type: [String], default: [] },
  },
  dailyRoutine: {
    warmup: { type: String, default: '5-10 mins dynamic stretching' },
    workout: { type: String, default: 'Main strength & conditioning' },
    cooldown: { type: String, default: '5-10 mins static stretching & foam rolling' },
    recovery: { type: String, default: 'Ensure 7-8 hours of quality sleep' },
  },
  recommendations: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FitnessPlan', fitnessPlanSchema);
