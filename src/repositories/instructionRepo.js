// src/repositories/instructionRepo.js
// Instruction data access layer - Richard Gutknecht

import prisma from '../config/db.js';

/**
 * Find all instructions for a recipe
 */
export async function findInstructionsByRecipeId(recipeId) {
  return prisma.instruction.findMany({
    where: { recipeId },
    orderBy: {
      stepNumber: 'asc'
    }
  });
}

/**
 * Find instruction by ID
 */
export async function findInstructionById(instructionId) {
  return prisma.instruction.findUnique({
    where: { instructionId },
    include: {
      recipe: {
        select: {
          recipeId: true,
          title: true,
          userId: true
        }
      }
    }
  });
}

/**
 * Create a new instruction
 */
export async function createInstruction(instructionData) {
  return prisma.instruction.create({
    data: instructionData
  });
}

/**
 * Update instruction by ID
 */
export async function updateInstruction(instructionId, updateData) {
  return prisma.instruction.update({
    where: { instructionId },
    data: updateData
  });
}

/**
 * Delete instruction by ID
 */
export async function deleteInstruction(instructionId) {
  return prisma.instruction.delete({
    where: { instructionId }
  });
}

/**
 * Check if step number exists for a recipe
 */
export async function findInstructionByRecipeAndStep(recipeId, stepNumber) {
  return prisma.instruction.findUnique({
    where: {
      recipeId_stepNumber: {
        recipeId,
        stepNumber
      }
    }
  });
}
