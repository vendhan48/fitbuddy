const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const progressRoutes = require('./routes/progressRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Root endpoint for browser navigation
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: '🚀 FitBuddy Backend API is running!',
    service: 'FitBuddy AI Fitness Engine',
    frontendUrl: 'http://localhost:5174',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      user: '/api/user',
      fitness: '/api/fitness',
      workout: '/api/workout',
      progress: '/api/progress',
      ai: '/api/ai',
    },
    timestamp: new Date(),
  });
});

// Route registration
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/workout', workoutRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);

// Root health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FitBuddy API Engine',
    timestamp: new Date(),
  });
});

// Start DB connection & Express Listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 FitBuddy Backend Server running on http://localhost:${PORT}`);
  });
});
