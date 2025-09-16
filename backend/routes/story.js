const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Session = require('../models/Session');

// ✅ Only check the key we actually need
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not set in .env file.");
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/story/generate
router.post('/generate', async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Answers are required.' });
  }

  try {
    // Save answers
    const newSession = new Session({ answers });
    await newSession.save();

    // Build prompt
    const prompt = `Based on the following feelings and responses, write a short, empathetic, and uplifting story for the user. The user felt: ${answers.join(', ')}.`;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const story = result.response.text();

    // Save story
    newSession.story = story;
    await newSession.save();

    // Send back
    res.json({ story });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ message: 'Failed to generate story.' });
  }
});

module.exports = router;

