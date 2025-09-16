const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h' // Automatically delete session after 24 hours
  },
  answers: {
    type: [String],
    required: true
  },
  story: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Session', SessionSchema);