
// src/controllers/ingredientController.js
// Ingredient request handlers

import * as ingredientService from '../services/ingredientService.js';

export async function getAllIngredientsHandler(req, res, next) {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
}

export async function getIngredientByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    const ingredient = await ingredientService.getIngredientById(id);
    res.status(200).json(ingredient);
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

export async function createIngredientHandler(req, res, next) {
  try {
    const newIngredient = await ingredientService.createNewIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
}

export async function updateIngredientHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    const updatedIngredient = await ingredientService.updateIngredientById(id, req.body);
    res.status(200).json(updatedIngredient);
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

export async function deleteIngredientHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.details = ['ID must be a valid number'];
      throw error;
    }

    await ingredientService.deleteIngredientById(id);
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
