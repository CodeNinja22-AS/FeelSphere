const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  answers: [AnswerSchema],
  finalTheme: {
    type: String,
  },
  generatedStory: {
    type: String,
  },
  generatedImages: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h', // Sessions will be deleted after 24 hours
  },
});

module.exports = mongoose.model('Session', SessionSchema);