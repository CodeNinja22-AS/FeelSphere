const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

/**
 * @route   POST /api/story/save-answer
 * @desc    Save a user's answer to a session
 */
router.post('/save-answer', async (req, res) => {
  const { sessionId, questionId, answer } = req.body;

  // Allow empty string for the open-ended question, but not null/undefined
  if (!sessionId || !questionId || (answer === undefined || answer === null)) {
    return res.status(400).json({ message: 'sessionId, questionId, and a valid answer are required.' });
  }

  try {
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { $push: { answers: { questionId, answer } } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: 'Answer saved.', session });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Failed to save answer.' });
  }
});

module.exports = router;
