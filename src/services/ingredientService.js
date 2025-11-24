
// src/services/ingredientService.js
// Ingredient business logic layer

import * as ingredientRepo from '../repositories/ingredientRepo.js';

export async function getAllIngredients() {
  return await ingredientRepo.findAllIngredients();
}

export async function getIngredientById(id) {
  const ingredient = await ingredientRepo.findIngredientById(id);

  if (!ingredient) {
    const error = new Error('Ingredient not found');
    error.status = 404;
    throw error;
  }

  return ingredient;
}

export async function createNewIngredient(ingredientData) {
  return await ingredientRepo.createIngredient(ingredientData);
}

export async function updateIngredientById(id, ingredientData) {
  // Check if ingredient exists
  await getIngredientById(id);

  return await ingredientRepo.updateIngredient(id, ingredientData);
}

export async function deleteIngredientById(id) {
  // Check if ingredient exists
  await getIngredientById(id);

  return await ingredientRepo.deleteIngredient(id);
}
