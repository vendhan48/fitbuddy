const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');
const FitnessProfile = require('../models/FitnessProfile');
const memoryDb = require('../config/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    if (isDbConnected()) {
      const user = await User.findById(userId).select('-password');
      let profile = await FitnessProfile.findOne({ userId });
      
      if (!profile && user) {
        profile = await FitnessProfile.create({
          userId: user._id,
          age: 25,
          gender: 'Male',
          height: 175,
          weight: 70,
          goal: 'General Fitness',
          activityLevel: 'Moderately Active',
          experience: 'Intermediate',
          workoutDays: 4,
          workoutDuration: 45,
          preferredLocation: 'Gym / Home',
          equipment: 'Dumbbells, Bodyweight',
          dietaryPreference: 'Balanced High Protein',
        });
      }

      return res.json({
        user: user || { id: userId, name: req.user.name, email: req.user.email },
        profile: profile || {},
      });
    } else {
      const user = memoryDb.users.find(u => u._id.toString() === userId.toString());
      let profile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());

      if (!profile) {
        profile = {
          _id: 'prof_' + Date.now(),
          userId,
          age: 25,
          gender: 'Male',
          height: 175,
          weight: 70,
          goal: 'General Fitness',
          activityLevel: 'Moderately Active',
          experience: 'Intermediate',
          workoutDays: 4,
          workoutDuration: 45,
          preferredLocation: 'Gym / Home',
          equipment: 'Dumbbells, Bodyweight',
          dietaryPreference: 'Balanced High Protein',
          updatedAt: new Date(),
        };
        memoryDb.profiles.push(profile);
      }

      return res.json({
        user: user 
          ? { id: user._id, name: user.name, email: user.email }
          : { id: userId, name: req.user.name || 'User', email: req.user.email || 'user@example.com' },
        profile,
      });
    }
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({ message: 'Error retrieving profile' });
  }
});

// PUT /api/user/profile
router.put('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
      experience,
      workoutDays,
      workoutDuration,
      preferredLocation,
      equipment,
      dietaryPreference,
      name,
    } = req.body;

    if (isDbConnected()) {
      if (name) {
        await User.findByIdAndUpdate(userId, { name });
      }

      const updatedProfile = await FitnessProfile.findOneAndUpdate(
        { userId },
        {
          $set: {
            age: age !== undefined ? Number(age) : 25,
            gender: gender || 'Male',
            height: height !== undefined ? Number(height) : 175,
            weight: weight !== undefined ? Number(weight) : 70,
            goal: goal || 'General Fitness',
            activityLevel: activityLevel || 'Moderately Active',
            experience: experience || 'Intermediate',
            workoutDays: workoutDays !== undefined ? Number(workoutDays) : 4,
            workoutDuration: workoutDuration !== undefined ? Number(workoutDuration) : 45,
            preferredLocation: preferredLocation || 'Gym / Home',
            equipment: equipment || 'Dumbbells, Bodyweight',
            dietaryPreference: dietaryPreference || 'Balanced High Protein',
            updatedAt: new Date(),
          },
        },
        { new: true, upsert: true }
      );

      return res.json({
        message: 'Profile updated successfully',
        profile: updatedProfile,
      });
    } else {
      if (name) {
        const u = memoryDb.users.find(x => x._id.toString() === userId.toString());
        if (u) u.name = name;
      }

      let profile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());
      if (!profile) {
        profile = { _id: 'prof_' + Date.now(), userId };
        memoryDb.profiles.push(profile);
      }

      profile.age = age !== undefined ? Number(age) : profile.age;
      profile.gender = gender || profile.gender;
      profile.height = height !== undefined ? Number(height) : profile.height;
      profile.weight = weight !== undefined ? Number(weight) : profile.weight;
      profile.goal = goal || profile.goal;
      profile.activityLevel = activityLevel || profile.activityLevel;
      profile.experience = experience || profile.experience;
      profile.workoutDays = workoutDays !== undefined ? Number(workoutDays) : profile.workoutDays;
      profile.workoutDuration = workoutDuration !== undefined ? Number(workoutDuration) : profile.workoutDuration;
      profile.preferredLocation = preferredLocation || profile.preferredLocation;
      profile.equipment = equipment || profile.equipment;
      profile.dietaryPreference = dietaryPreference || profile.dietaryPreference;
      profile.updatedAt = new Date();

      return res.json({
        message: 'Profile updated successfully',
        profile,
      });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router;
