const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Session = require('../models/Session');

// Initialize Gemini AI
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// POST /api/story/generate
// Generates a story based on user answers
router.post('/generate', async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Answers are required.' });
  }

  try {
    // 1. Save the user's answers to a new session in the database.
    const newSession = new Session({ answers });
    await newSession.save();

    // 2. Construct the prompt for the generative model.
    //    This is a crucial step. You need to format the answers into a
    //    coherent prompt that guides the model to write a story.
    const prompt = `Based on the following feelings and responses, write a short, empathetic, and uplifting story for the user. The user felt: ${answers.join(', ')}.`;

    // 3. Call the generative model to get the story.
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const story = response.text();

    // 4. Update the session with the generated story.
    newSession.story = story;
    await newSession.save();

    // 5. Send the generated story back to the frontend.
    res.json({ story });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ message: 'Failed to generate story.' });
  }
});

module.exports = router;