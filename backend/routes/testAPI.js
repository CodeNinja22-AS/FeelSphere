const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/gemini-status', async (req, res) => {
    if (!process.env.GEMINI_API_URL || !process.env.GEMINI_API_KEY) {
        return res.status(500).json({ message: 'GEMINI_API_URL or GEMINI_API_KEY not set in .env file.' });
    }
    try {
        const response = await axios.post(
            process.env.GEMINI_API_URL,
            {
                contents: [{ parts: [{ text: "ping" }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': process.env.GEMINI_API_KEY
                }
            }
        );
        res.status(200).json({ message: 'Gemini API key is valid.', data: response.data });
    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to connect to Gemini API. Check your API key and network connection.' });
    }
});

module.exports = router;
