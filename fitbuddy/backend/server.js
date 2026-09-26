const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const fitnessRoutes = require('./routes/fitnessRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS & JSON middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
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
      fitness: '/api/fitness',
      ai: '/api/ai',
    },
    timestamp: new Date(),
  });
});

// Route registration
app.use('/api/fitness', fitnessRoutes);
app.use('/api/ai', aiRoutes);

// Root health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FitBuddy API Engine',
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`FitBuddy Backend Server running on http://localhost:${PORT}`);
});
