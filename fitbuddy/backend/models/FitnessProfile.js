const mongoose = require('mongoose');

const fitnessProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  age: { type: Number, default: 25 },
  gender: { type: String, default: 'Male' },
  height: { type: Number, default: 175 }, // in cm
  weight: { type: Number, default: 70 }, // in kg
  goal: { 
    type: String, 
    enum: ['Weight Management', 'Muscle Building', 'Strength', 'Endurance', 'General Fitness'], 
    default: 'General Fitness' 
  },
  activityLevel: { 
    type: String, 
    enum: ['Beginner', 'Lightly Active', 'Moderately Active', 'Very Active'], 
    default: 'Moderately Active' 
  },
  experience: { type: String, default: 'Intermediate' },
  workoutDays: { type: Number, default: 4 },
  workoutDuration: { type: Number, default: 45 }, // in mins
  preferredLocation: { type: String, default: 'Gym / Home' },
  equipment: { type: String, default: 'Dumbbells, Resistance Bands' },
  dietaryPreference: { type: String, default: 'High Protein / Balanced' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FitnessProfile', fitnessProfileSchema);
