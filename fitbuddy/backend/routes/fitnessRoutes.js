const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const FitnessProfile = require('../models/FitnessProfile');
const FitnessPlan = require('../models/FitnessPlan');
const memoryDb = require('../config/memoryStore');
const { generateFitnessPlan, buildFallbackPlan } = require('../services/geminiService');

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/fitness/generate-plan
router.post('/generate-plan', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let profileData = req.body;

    // If profile data not supplied in body, fetch user profile
    if (!profileData || !profileData.goal) {
      if (isDbConnected()) {
        const found = await FitnessProfile.findOne({ userId });
        if (found) profileData = found;
      } else {
        const found = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());
        if (found) profileData = found;
      }
    }

    if (!profileData || !profileData.goal) {
      profileData = {
        age: 26,
        gender: 'Male',
        height: 175,
        weight: 70,
        goal: 'General Fitness',
        activityLevel: 'Moderately Active',
        experience: 'Intermediate',
        workoutDays: 4,
        workoutDuration: 45,
        preferredLocation: 'Gym / Home',
        equipment: 'Dumbbells',
        dietaryPreference: 'High Protein',
      };
    }

    console.log(`[Fitness API] Generating AI plan for user ${userId} with goal: ${profileData.goal}...`);
    const planData = await generateFitnessPlan(profileData);

    if (isDbConnected()) {
      const createdPlan = await FitnessPlan.create({
        userId,
        title: planData.title || `AI ${profileData.goal} Blueprint`,
        workoutPlan: planData.workoutPlan,
        nutritionPlan: planData.nutritionPlan,
        dailyRoutine: planData.dailyRoutine,
        recommendations: planData.recommendations,
      });

      return res.status(201).json({
        message: 'AI Fitness Plan generated successfully',
        plan: createdPlan,
      });
    } else {
      const createdPlan = {
        _id: 'plan_' + Date.now(),
        userId,
        title: planData.title || `AI ${profileData.goal} Blueprint`,
        workoutPlan: planData.workoutPlan,
        nutritionPlan: planData.nutritionPlan,
        dailyRoutine: planData.dailyRoutine,
        recommendations: planData.recommendations,
        createdAt: new Date(),
      };
      
      // Store as latest plan
      memoryDb.plans = memoryDb.plans.filter(p => p.userId.toString() !== userId.toString());
      memoryDb.plans.unshift(createdPlan);

      return res.status(201).json({
        message: 'AI Fitness Plan generated successfully',
        plan: createdPlan,
      });
    }
  } catch (error) {
    console.error('Generate Plan Error:', error);
    return res.status(500).json({ message: 'Failed to generate AI fitness plan' });
  }
});

// GET /api/fitness/plan
router.get('/plan', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    if (isDbConnected()) {
      let plan = await FitnessPlan.findOne({ userId }).sort({ createdAt: -1 });

      if (!plan) {
        // Generate initial fallback plan
        const profile = await FitnessProfile.findOne({ userId });
        const fallback = buildFallbackPlan(profile || {});
        plan = await FitnessPlan.create({
          userId,
          title: fallback.title,
          workoutPlan: fallback.workoutPlan,
          nutritionPlan: fallback.nutritionPlan,
          dailyRoutine: fallback.dailyRoutine,
          recommendations: fallback.recommendations,
        });
      }

      return res.json({ plan });
    } else {
      let plan = memoryDb.plans.find(p => p.userId.toString() === userId.toString());

      if (!plan) {
        const profile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());
        const fallback = buildFallbackPlan(profile || {});
        plan = {
          _id: 'plan_' + Date.now(),
          userId,
          title: fallback.title,
          workoutPlan: fallback.workoutPlan,
          nutritionPlan: fallback.nutritionPlan,
          dailyRoutine: fallback.dailyRoutine,
          recommendations: fallback.recommendations,
          createdAt: new Date(),
        };
        memoryDb.plans.unshift(plan);
      }

      return res.json({ plan });
    }
  } catch (error) {
    console.error('Get Plan Error:', error);
    return res.status(500).json({ message: 'Error fetching fitness plan' });
  }
});

module.exports = router;
