// src/routes/userRoutes.js
// User profile routes - Lincoln Manana Santana

import express from 'express';
import {
  getMeHandler,
  updateMeHandler,
  getMyRecipesHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/authorize.js';
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

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (admin only)
 */
router.get('/', authenticate, requireAdmin, getAllUsersHandler);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (admin or self)
 */
router.get('/:id', authenticate, getUserByIdHandler);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Private (admin or self)
 */
router.put('/:id', authenticate, validateUpdateProfile, updateUserByIdHandler);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Private (admin or self)
 */
router.delete('/:id', authenticate, deleteUserByIdHandler);

export default router;