const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const FitnessProfile = require('../models/FitnessProfile');
const memoryDb = require('../config/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// GET /api/progress
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    if (isDbConnected()) {
      const logs = await Progress.find({ userId }).sort({ date: 1 });
      const profile = await FitnessProfile.findOne({ userId });

      return res.json({
        logs,
        currentWeight: profile?.weight || (logs.length > 0 ? logs[logs.length - 1].weight : 70),
        targetWeight: profile?.goal === 'Muscle Building' 
          ? (profile.weight || 70) + 5 
          : profile?.goal === 'Weight Management' 
          ? (profile.weight || 70) - 5 
          : (profile?.weight || 70),
      });
    } else {
      const logs = memoryDb.progressLogs
        .filter(p => p.userId.toString() === userId.toString())
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const profile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());

      return res.json({
        logs,
        currentWeight: profile?.weight || (logs.length > 0 ? logs[logs.length - 1].weight : 70),
        targetWeight: profile?.goal === 'Muscle Building' 
          ? (profile.weight || 70) + 5 
          : profile?.goal === 'Weight Management' 
          ? (profile.weight || 70) - 5 
          : (profile?.weight || 70),
      });
    }
  } catch (error) {
    console.error('Get Progress Error:', error);
    return res.status(500).json({ message: 'Error retrieving progress data' });
  }
});

// POST /api/progress
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { weight, workoutCompleted, workoutTitle, chest, waist, arms, notes } = req.body;

    if (!weight && !workoutCompleted && !notes) {
      return res.status(400).json({ message: 'Please provide at least a weight or workout note to log' });
    }

    if (isDbConnected()) {
      const newLog = await Progress.create({
        userId,
        weight: weight ? Number(weight) : 70,
        workoutCompleted: !!workoutCompleted,
        workoutTitle: workoutTitle || 'Logged Workout',
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        arms: arms ? Number(arms) : undefined,
        notes: notes || '',
        date: new Date(),
      });

      // Update current weight in profile if weight supplied
      if (weight) {
        await FitnessProfile.findOneAndUpdate(
          { userId },
          { weight: Number(weight), updatedAt: new Date() }
        );
      }

      return res.status(201).json({
        message: 'Progress logged successfully',
        progress: newLog,
      });
    } else {
      const newLog = {
        _id: 'prog_' + Date.now(),
        userId,
        weight: weight ? Number(weight) : 70,
        workoutCompleted: !!workoutCompleted,
        workoutTitle: workoutTitle || 'Logged Workout',
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        arms: arms ? Number(arms) : undefined,
        notes: notes || '',
        date: new Date(),
      };

      memoryDb.progressLogs.push(newLog);

      if (weight) {
        const profile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());
        if (profile) {
          profile.weight = Number(weight);
          profile.updatedAt = new Date();
        }
      }

      return res.status(201).json({
        message: 'Progress logged successfully',
        progress: newLog,
      });
    }
  } catch (error) {
    console.error('Log Progress Error:', error);
    return res.status(500).json({ message: 'Error logging progress entry' });
  }
});

module.exports = router;
