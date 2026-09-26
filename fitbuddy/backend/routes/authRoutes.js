const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const FitnessProfile = require('../models/FitnessProfile');
const memoryDb = require('../config/memoryStore');

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDbConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
      });

      // Default fitness profile
      await FitnessProfile.create({
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

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'fitbuddy_super_secret_jwt_key_2026',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // Memory DB fallback
      const existingUser = memoryDb.users.find(u => u.email === normalizedEmail);
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newId = 'user_' + Date.now();

      const user = {
        _id: newId,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        createdAt: new Date(),
      };
      memoryDb.users.push(user);

      // Default profile
      memoryDb.profiles.push({
        _id: 'prof_' + Date.now(),
        userId: newId,
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
      });

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'fitbuddy_super_secret_jwt_key_2026',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDbConnected()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'fitbuddy_super_secret_jwt_key_2026',
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // Memory DB fallback
      const user = memoryDb.users.find(u => u.email === normalizedEmail);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'fitbuddy_super_secret_jwt_key_2026',
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
