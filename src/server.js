// src/server.js
// Main entry point for Recipe API - ITIS 4166-051 Group 17

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Import routes (uncomment as they are implemented)
// import authRoutes from './routes/authRoutes.js';
// import recipeRoutes from './routes/recipeRoutes.js';
// import ingredientRoutes from './routes/ingredientRoutes.js';
// import instructionRoutes from './routes/instructionRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Swagger API documentation
const specs = YAML.load('./public/bundled.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Basic health check
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
      auth: '/api/auth',
      recipes: '/api/recipes',
      ingredients: '/api/ingredients',
      instructions: '/api/instructions',
      documentation: '/api-docs'
    }
  });
});

// API Routes (uncomment as routes are implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/recipes', recipeRoutes);
// app.use('/api/ingredients', ingredientRoutes);
// app.use('/api/instructions', instructionRoutes);

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
  console.log(`🚀 Recipe API server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
});

export default app;