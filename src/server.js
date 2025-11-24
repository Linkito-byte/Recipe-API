// src/server.js
// Main entry point for Recipe API - ITIS 4166-051 Group 17

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Recipe API'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe API is running!',
    version: '1.0.0',
    team: 'Group 17',
    endpoints: {
      recipes: '/api/recipes',
      health: '/health'
    }
  });
});

// API Routes
app.use('/api/recipes', recipeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Recipe API server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`URL: http://localhost:${PORT}`);
});

export default app;
