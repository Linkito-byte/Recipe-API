// src/controllers/recipeController.js
// Recipe request handlers

import * as recipeService from '../services/recipeService.js';

export async function getAllRecipesHandler(req, res, next) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
}

export async function getRecipeByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    const recipe = await recipeService.getRecipeById(id);
    res.status(200).json(recipe);
  } catch (error) {
    if (error.status === 400 && error.details) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    
    next(error);
  }
}

export async function createRecipeHandler(req, res, next) {
  try {
    const newRecipe = await recipeService.createNewRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
}

export async function updateRecipeHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    const updatedRecipe = await recipeService.updateRecipeById(id, req.body);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    if (error.status === 400 && error.details) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    
    next(error);
  }
}

export async function deleteRecipeHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    await recipeService.deleteRecipeById(id);
    res.status(204).send();
  } catch (error) {
    if (error.status === 400 && error.details) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    
    next(error);
  }
}
