const express = require('express');
const axios = require('axios');
require('dotenv').config();

const connectDB = require('./db'); // import your db.js

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h2>Gemini AI Test</h2>
    <form action="/generate" method="POST">
      <input type="text" name="prompt" placeholder="Enter your prompt" style="width:300px;" required />
      <button type="submit">Generate</button>
    </form>
  `);
});

// Gemini API integration route
app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.send('Prompt is required');

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.send(`
      <h2>Prompt:</h2><p>${prompt}</p>
      <h2>Response from Gemini AI:</h2><pre>${aiText}</pre>
      <a href="/">Try another prompt</a>
    `);
  } catch (error) {
    res.send(`Error: ${error.response?.data?.error?.message || error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
