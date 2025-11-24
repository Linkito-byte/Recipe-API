// src/controllers/ingredientController.js
// Ingredient request handlers - Giani Hill

import * as ingredientService from '../services/ingredientService.js';

/**
 * Get all ingredients
 * GET /api/ingredients
 */
export async function getAllIngredientsHandler(req, res, next) {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
}

/**
 * Get ingredient by ID
 * GET /api/ingredients/:id
 */
export async function getIngredientByIdHandler(req, res, next) {
  try {
    const ingredientId = parseInt(req.params.id);
    
    if (isNaN(ingredientId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Ingredient ID must be a valid number']
      });
    }

    const ingredient = await ingredientService.getIngredientById(ingredientId);
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new ingredient
 * POST /api/ingredients
 */
export async function createIngredientHandler(req, res, next) {
  try {
    const newIngredient = await ingredientService.createIngredient(req.body);
    res.status(201).json({
      message: 'Ingredient created successfully',
      ingredient: newIngredient
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update ingredient by ID
 * PUT /api/ingredients/:id
 */
export async function updateIngredientHandler(req, res, next) {
  try {
    const ingredientId = parseInt(req.params.id);
    
    if (isNaN(ingredientId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Ingredient ID must be a valid number']
      });
    }

    const updatedIngredient = await ingredientService.updateIngredientById(ingredientId, req.body);
    res.status(200).json({
      message: 'Ingredient updated successfully',
      ingredient: updatedIngredient
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete ingredient by ID
 * DELETE /api/ingredients/:id
 */
export async function deleteIngredientHandler(req, res, next) {
  try {
    const ingredientId = parseInt(req.params.id);
    
    if (isNaN(ingredientId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Ingredient ID must be a valid number']
      });
    }

    await ingredientService.deleteIngredientById(ingredientId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
