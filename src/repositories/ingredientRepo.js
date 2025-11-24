// src/repositories/ingredientRepo.js
// Ingredient data access layer - Giani Hill

import prisma from '../config/db.js';

/**
 * Find all ingredients
 */
export async function findAllIngredients() {
  return prisma.ingredient.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

/**
 * Find ingredient by ID
 */
export async function findIngredientById(ingredientId) {
  return prisma.ingredient.findUnique({
    where: { ingredientId },
    include: {
      recipeIngredients: {
        include: {
          recipe: {
            select: {
              recipeId: true,
              title: true
            }
          }
        }
      }
    }
  });
}

/**
 * Find ingredient by name
 */
export async function findIngredientByName(name) {
  return prisma.ingredient.findUnique({
    where: { name }
  });
}

/**
 * Create a new ingredient
 */
export async function createIngredient(ingredientData) {
  return prisma.ingredient.create({
    data: ingredientData
  });
}

/**
 * Update ingredient by ID
 */
export async function updateIngredient(ingredientId, updateData) {
  return prisma.ingredient.update({
    where: { ingredientId },
    data: updateData
  });
}

/**
 * Delete ingredient by ID
 */
export async function deleteIngredient(ingredientId) {
  return prisma.ingredient.delete({
    where: { ingredientId }
  });
}
