// src/services/recipeService.js
// Recipe business logic layer

import * as recipeRepo from '../repositories/recipeRepo.js';

export async function getAllRecipes() {
  return await recipeRepo.findAllRecipes();
}

export async function getRecipeById(id) {
  const recipe = await recipeRepo.findRecipeById(id);
  
  if (!recipe) {
    const error = new Error('Recipe not found');
    error.status = 404;
    throw error;
  }
  
  return recipe;
}

export async function createNewRecipe(recipeData) {
  return await recipeRepo.createRecipe(recipeData);
}

export async function updateRecipeById(id, recipeData) {
  // Check if recipe exists
  await getRecipeById(id);
  
  return await recipeRepo.updateRecipe(id, recipeData);
}

export async function deleteRecipeById(id) {
  // Check if recipe exists
  await getRecipeById(id);
  
  return await recipeRepo.deleteRecipe(id);
}
