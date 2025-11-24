// src/services/ingredientService.js
// Ingredient business logic layer - Giani Hill

import * as ingredientRepo from '../repositories/ingredientRepo.js';

/**
 * Get all ingredients
 */
export async function getAllIngredients() {
  return await ingredientRepo.findAllIngredients();
}

/**
 * Get ingredient by ID
 */
export async function getIngredientById(ingredientId) {
  const ingredient = await ingredientRepo.findIngredientById(ingredientId);
  
  if (!ingredient) {
    const error = new Error('Ingredient not found');
    error.status = 404;
    throw error;
  }
  
  return ingredient;
}

/**
 * Create a new ingredient
 */
export async function createIngredient(ingredientData) {
  const { name, unit } = ingredientData;

  // Check if ingredient with same name already exists
  const existingIngredient = await ingredientRepo.findIngredientByName(name);
  if (existingIngredient) {
    const error = new Error('Ingredient with this name already exists');
    error.status = 409;
    throw error;
  }

  return await ingredientRepo.createIngredient({ name, unit });
}

/**
 * Update ingredient by ID
 */
export async function updateIngredientById(ingredientId, updateData) {
  // Check if ingredient exists
  await getIngredientById(ingredientId);

  // If name is being updated, check if it's already taken
  if (updateData.name) {
    const existingIngredient = await ingredientRepo.findIngredientByName(updateData.name);
    if (existingIngredient && existingIngredient.ingredientId !== ingredientId) {
      const error = new Error('Ingredient with this name already exists');
      error.status = 409;
      throw error;
    }
  }

  return await ingredientRepo.updateIngredient(ingredientId, updateData);
}

/**
 * Delete ingredient by ID
 */
export async function deleteIngredientById(ingredientId) {
  // Check if ingredient exists
  await getIngredientById(ingredientId);
  
  return await ingredientRepo.deleteIngredient(ingredientId);
}
