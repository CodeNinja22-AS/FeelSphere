const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const storyRoutes = require('./routes/story');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/story', storyRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('FeelSphere Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});