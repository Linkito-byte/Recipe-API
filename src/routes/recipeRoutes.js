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
import { validateRecipe, validateRecipeUpdate } from '../middleware/validateRecipe.js';

const router = express.Router();

router.get('/', getAllRecipesHandler);
router.get('/:id', getRecipeByIdHandler);
router.post('/', validateRecipe, createRecipeHandler);
router.put('/:id', validateRecipeUpdate, updateRecipeHandler);
router.delete('/:id', deleteRecipeHandler);

export default router;
