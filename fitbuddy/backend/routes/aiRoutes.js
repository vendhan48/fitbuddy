const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../services/geminiService');

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, history, profile } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Please enter a valid question or message' });
    }

    console.log(`[AI Assistant API] Received question: "${message}"`);
    const reply = await chatWithAI(message, history || [], profile || null);

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
