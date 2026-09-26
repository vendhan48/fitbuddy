const express = require('express');
const router = express.Router();
const { generateFitnessPlan } = require('../services/geminiService');

// POST /api/fitness/generate-plan
router.post('/generate-plan', async (req, res) => {
  try {
    const profile = req.body && typeof req.body === 'object' ? req.body : {};
    if (!profile.goal) {
      return res.status(400).json({ message: 'Fitness profile and goal are required' });
    }

    console.log(`[Fitness API] Generating AI plan for goal: ${profile.goal}`);
    const plan = await generateFitnessPlan(profile);
    return res.status(201).json({ message: 'AI Fitness Plan generated successfully', plan });
  } catch (error) {
    console.error('Generate Plan Error:', error);
    return res.status(500).json({ message: 'Failed to generate AI fitness plan' });
  }
});

module.exports = router;