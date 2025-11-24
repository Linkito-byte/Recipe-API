// src/routes/userRoutes.js
// User profile routes - Lincoln Manana Santana

import express from 'express';
import {
  getMeHandler,
  updateMeHandler,
  getMyRecipesHandler,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validateUpdateProfile } from '../middleware/validateAuth.js';

const router = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private (requires authentication)
 */
router.get('/me', authenticate, getMeHandler);

/**
 * @route   PUT /api/users/me
 * @desc    Update current user profile
 * @access  Private (requires authentication)
 */
router.put('/me', authenticate, validateUpdateProfile, updateMeHandler);

/**
 * @route   GET /api/users/me/recipes
 * @desc    Get current user's recipes
 * @access  Private (requires authentication)
 */
router.get('/me/recipes', authenticate, getMyRecipesHandler);

export default router;