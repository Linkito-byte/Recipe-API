// src/routes/recipeRoutes.js
// Recipe routes

import express from 'express';
import {
  getAllRecipesHandler,
  getRecipeByIdHandler,
  createRecipeHandler,
  updateRecipeHandler,
  deleteRecipeHandler,
} from '../controllers/recipeController.js';
import {
  getInstructionsByRecipeIdHandler,
  createInstructionHandler,
} from '../controllers/instructionController.js';
import { authenticate } from '../middleware/auth.js';
import { validateRecipe, validateRecipeUpdate } from '../middleware/validateRecipe.js';
import { validateInstruction } from '../middleware/validateInstruction.js';

const router = express.Router();

/**
 * @route   GET /api/recipes
 * @desc    Get all recipes
 * @access  Public
 */
router.get('/', getAllRecipesHandler);

/**
 * @route   GET /api/recipes/:id
 * @desc    Get recipe by ID
 * @access  Public
 */
router.get('/:id', getRecipeByIdHandler);

/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 * @access  Private
 */
router.post('/', authenticate, validateRecipe, createRecipeHandler);

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update recipe by ID
 * @access  Private (owner or admin)
 */
router.put('/:id', authenticate, validateRecipeUpdate, updateRecipeHandler);

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete recipe by ID
 * @access  Private (owner or admin)
 */
router.delete('/:id', authenticate, deleteRecipeHandler);

/**
 * @route   GET /api/recipes/:id/instructions
 * @desc    Get all instructions for a recipe
 * @access  Public
 */
router.get('/:id/instructions', getInstructionsByRecipeIdHandler);

/**
 * @route   POST /api/recipes/:id/instructions
 * @desc    Add instruction to a recipe
 * @access  Private (owner or admin)
 */
router.post('/:id/instructions', authenticate, validateInstruction, createInstructionHandler);

export default router;
