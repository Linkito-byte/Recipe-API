// src/repositories/recipeRepo.js
// Recipe data access layer

import prisma from '../config/db.js';

export async function findAllRecipes() {
  return prisma.recipe.findMany({
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      },
      recipeIngredients: {
        include: {
          ingredient: true
        }
      },
      instructions: {
        orderBy: {
          stepNumber: 'asc'
        }
      }
    }
  });
}

export async function findRecipeById(id) {
  return prisma.recipe.findUnique({
    where: { recipeId: id },
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      },
      recipeIngredients: {
        include: {
          ingredient: true
        }
      },
      instructions: {
        orderBy: {
          stepNumber: 'asc'
        }
      }
    }
  });
}

export async function createRecipe(data) {
  return prisma.recipe.create({
    data,
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });
}

export async function updateRecipe(id, data) {
  return prisma.recipe.update({
    where: { recipeId: id },
    data,
    include: {
      user: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });
}

export async function deleteRecipe(id) {
  return prisma.recipe.delete({
    where: { recipeId: id }
  });
}
