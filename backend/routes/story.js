const express = require('express');
const router = express.Router();
const axios = require('axios');
const Session = require('../models/Session');
const { allQuestions } = require('../questions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to find the theme_map for a given question ID
const getThemeMap = (questionId) => {
  const question = allQuestions.find(q => q.id === questionId);
  return question ? question.theme_map : {};
};

// Helper function to get the theme from a question's value
const getThemeFromValue = (questionId, value) => {
  const themeMap = getThemeMap(questionId);
  return themeMap[value] || 'default';
};

// Main analysis function
const analyzeResponses = (responses) => {
  let scores = {
    'stuck': 0,
    'anxiety': 0,
    'disconnected': 0,
    'blame': 0,
    'default': 0
  };
  let openEndedAnswer = '';

  for (const response of responses) {
    const question = allQuestions.find(q => q.id === response.questionId);
    if (question && question.is_open_ended) {
      openEndedAnswer = response.answer;
    } else {
      const themeKey = getThemeFromValue(response.questionId, response.answer);
      if (scores[themeKey] !== undefined) {
        scores[themeKey]++;
      }
    }
  }

  let coreProblem = 'general life challenges';
  let emotionalState = 'a mix of feelings';
  
  let maxScore = 0;
  for (const theme in scores) {
    if (scores[theme] > maxScore) {
      maxScore = scores[theme];
      coreProblem = theme;
    }
  }

  const q1Answer = responses.find(r => r.questionId === 'q1')?.answer;
  if (q1Answer === 'low-energy' || q1Answer === 'empty-energy') emotionalState = 'drained and listless';
  if (q1Answer === 'high-energy') emotionalState = 'tense and restless';
  
  return { coreProblem, openEndedAnswer, emotionalState };
};

// Endpoint to save a user's answer
router.post('/save-answer', async (req, res) => {
  const { sessionId, questionId, answer } = req.body;
  try {
    await Session.findOneAndUpdate(
      { sessionId },
      { $push: { responses: { questionId, answer } } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Answer saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save answer.', error: error.message });
  }
});

// Endpoint to generate and return a story and image
router.get('/generate/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Session.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ message: 'Session not found.' });
        }

        const userProfile = analyzeResponses(session.responses);
        
        const storyPrompt = `
        You are an empathetic, culturally-aware wellness mentor for Indian youth. Your user is a young person in India who feels ${userProfile.emotionalState}, and their main challenge is related to being "${userProfile.coreProblem}". The user also shared: "${userProfile.openEndedAnswer}".

        Task:
        - Generate a deeply creative, fictional short story (2 paragraphs) about a young Indian protagonist facing a similar challenge.
        - The narrative should be metaphorical and offer an indirect solution, teaching a lesson about emotional resilience and self-discovery.
        - The tone must be supportive and inspiring, not preachy or prescriptive.
        - The story should be relatable to an Indian cultural context.

        Example: Instead of saying "you should try this," the story could be about a protagonist who discovers a hidden path, symbolizing a new way of thinking.
        `;

        const imagePrompt = `Calming, minimalist cartoon style illustration of a person overcoming the challenge of feeling ${userProfile.coreProblem}, with Indian cultural motifs and soft colors.`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const storyResult = await model.generateContent(storyPrompt);
        const storyText = storyResult.response.text();
        
        // Placeholder for an image URL. Replace this with a call to a dedicated image generation API.
        const imageUrl = `https://oaidalleapiprodscus.blob.core.windows.net/private/org-1FzHhQj8Z4yT4C8G2E7Yp3P/user-h14F5Yv6K9gH0j5X0v5j4L8Q/img-12345.png`;

        res.json({ story: storyText, imageUrl: imageUrl });

    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to generate content.', error: error.message });
    }
});

module.exports = router;