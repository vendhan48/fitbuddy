const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const FitnessProfile = require('../models/FitnessProfile');
const memoryDb = require('../config/memoryStore');
const { chatWithAI } = require('../services/geminiService');

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/ai/chat
router.post('/chat', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Please enter a valid question or message' });
    }

    let userProfile = null;
    if (isDbConnected()) {
      userProfile = await FitnessProfile.findOne({ userId });
    } else {
      userProfile = memoryDb.profiles.find(p => p.userId.toString() === userId.toString());
    }

    console.log(`[AI Assistant API] User ${userId} asked: "${message}"`);
    const reply = await chatWithAI(message, history || [], userProfile);

    return res.json({
      reply,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({ 
      message: 'Failed to retrieve AI response',
      reply: "FitBuddy AI is experiencing a brief connection delay. Please focus on proper form, hydration, and progressive overload!\n\n*FitBuddy provides general fitness and wellness guidance and is not a substitute for professional medical advice.*"
    });
  }
});

module.exports = router;
