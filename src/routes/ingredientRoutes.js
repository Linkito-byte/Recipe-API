// src/routes/ingredientRoutes.js
// Ingredient routes - Giani Hill

import express from 'express';
import {
  getAllIngredientsHandler,
  getIngredientByIdHandler,
  createIngredientHandler,
  updateIngredientHandler,
  deleteIngredientHandler,
} from '../controllers/ingredientController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/authorize.js';
import { validateIngredient, validateIngredientUpdate } from '../middleware/validateIngredient.js';

const router = express.Router();

/**
 * @route   GET /api/ingredients
 * @desc    Get all ingredients
 * @access  Public
 */
router.get('/', getAllIngredientsHandler);

/**
 * @route   GET /api/ingredients/:id
 * @desc    Get ingredient by ID
 * @access  Public
 */
router.get('/:id', getIngredientByIdHandler);

/**
 * @route   POST /api/ingredients
 * @desc    Create a new ingredient
 * @access  Private (admin only)
 */
router.post('/', authenticate, requireAdmin, validateIngredient, createIngredientHandler);

/**
 * @route   PUT /api/ingredients/:id
 * @desc    Update ingredient by ID
 * @access  Private (admin only)
 */
router.put('/:id', authenticate, requireAdmin, validateIngredientUpdate, updateIngredientHandler);

/**
 * @route   DELETE /api/ingredients/:id
 * @desc    Delete ingredient by ID
 * @access  Private (admin only)
 */
router.delete('/:id', authenticate, requireAdmin, deleteIngredientHandler);

export default router;
