
import prisma from '../config/db.js';

// Get all ingredients
export async function findAllIngredients() {
  return prisma.ingredient.findMany();
}

// Get ingredient by ID
export async function findIngredientById(id) {
  return prisma.ingredient.findUnique({
    where: { ingredientId: id }
  });
}

// Create ingredient
export async function createIngredient(data) {
  return prisma.ingredient.create({
    data
  });
}

// Update ingredient
export async function updateIngredient(id, data) {
  return prisma.ingredient.update({
    where: { ingredientId: id },
    data
  });
}

// Delete ingredient (hard delete)
export async function deleteIngredient(id) {
  return prisma.ingredient.delete({
    where: { ingredientId: id }
  });
}
