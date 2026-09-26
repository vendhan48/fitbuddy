const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const FitnessPlan = require('../models/FitnessPlan');
const Progress = require('../models/Progress');
const memoryDb = require('../config/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/workout/complete
router.post('/complete', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { exerciseId, dayIndex, completed, type, mealKey } = req.body;

    if (isDbConnected()) {
      let plan = await FitnessPlan.findOne({ userId }).sort({ createdAt: -1 });
      if (!plan) {
        return res.status(404).json({ message: 'No active fitness plan found' });
      }

      if (type === 'meal' && mealKey) {
        let completedMeals = plan.nutritionPlan.completedMeals || [];
        if (completed && !completedMeals.includes(mealKey)) {
          completedMeals.push(mealKey);
        } else if (!completed) {
          completedMeals = completedMeals.filter(m => m !== mealKey);
        }
        plan.nutritionPlan.completedMeals = completedMeals;
        await plan.save();

        return res.json({
          message: 'Meal tracking updated',
          plan,
        });
      }

      // Exercise completion
      if (dayIndex !== undefined && exerciseId && plan.workoutPlan[dayIndex]) {
        const exercise = plan.workoutPlan[dayIndex].exercises.find(
          e => e.id === exerciseId || e._id?.toString() === exerciseId
        );
        if (exercise) {
          exercise.completed = completed;
          await plan.save();

          // Log progress entry if completing workout
          const dayExercises = plan.workoutPlan[dayIndex].exercises;
          const completedCount = dayExercises.filter(e => e.completed).length;
          
          if (completedCount === dayExercises.length) {
            await Progress.create({
              userId,
              weight: 70, // default or latest
              workoutCompleted: true,
              workoutTitle: plan.workoutPlan[dayIndex].day,
              notes: `Completed ${plan.workoutPlan[dayIndex].day} workout session!`,
              date: new Date(),
            });
          }

          return res.json({
            message: 'Exercise progress updated',
            plan,
          });
        }
      }

      return res.status(400).json({ message: 'Target exercise or day not found' });
    } else {
      let plan = memoryDb.plans.find(p => p.userId.toString() === userId.toString());
      if (!plan) {
        return res.status(404).json({ message: 'No active fitness plan found' });
      }

      if (type === 'meal' && mealKey) {
        let completedMeals = plan.nutritionPlan.completedMeals || [];
        if (completed && !completedMeals.includes(mealKey)) {
          completedMeals.push(mealKey);
        } else if (!completed) {
          completedMeals = completedMeals.filter(m => m !== mealKey);
        }
        plan.nutritionPlan.completedMeals = completedMeals;

        return res.json({
          message: 'Meal tracking updated',
          plan,
        });
      }

      if (dayIndex !== undefined && exerciseId && plan.workoutPlan[dayIndex]) {
        const exercise = plan.workoutPlan[dayIndex].exercises.find(
          e => e.id === exerciseId || e._id === exerciseId
        );
        if (exercise) {
          exercise.completed = completed;

          const dayExercises = plan.workoutPlan[dayIndex].exercises;
          const completedCount = dayExercises.filter(e => e.completed).length;

          if (completedCount === dayExercises.length) {
            memoryDb.progressLogs.push({
              _id: 'prog_' + Date.now(),
              userId,
              weight: 74,
              workoutCompleted: true,
              workoutTitle: plan.workoutPlan[dayIndex].day,
              notes: `Completed ${plan.workoutPlan[dayIndex].day}!`,
              date: new Date(),
            });
          }

          return res.json({
            message: 'Exercise progress updated',
            plan,
          });
        }
      }

      return res.status(400).json({ message: 'Target exercise or day not found' });
    }
  } catch (error) {
    console.error('Workout Completion Error:', error);
    return res.status(500).json({ message: 'Error updating workout status' });
  }
});

module.exports = router;
