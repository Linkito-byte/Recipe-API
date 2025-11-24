// src/services/instructionService.js
// Instruction business logic layer - Richard Gutknecht

import * as instructionRepo from '../repositories/instructionRepo.js';
import * as recipeRepo from '../repositories/recipeRepo.js';

/**
 * Get all instructions for a recipe
 */
export async function getInstructionsByRecipeId(recipeId) {
  // Check if recipe exists
  const recipe = await recipeRepo.findRecipeById(recipeId);
  if (!recipe) {
    const error = new Error('Recipe not found');
    error.status = 404;
    throw error;
  }

  return await instructionRepo.findInstructionsByRecipeId(recipeId);
}

/**
 * Get instruction by ID
 */
export async function getInstructionById(instructionId) {
  const instruction = await instructionRepo.findInstructionById(instructionId);
  
  if (!instruction) {
    const error = new Error('Instruction not found');
    error.status = 404;
    throw error;
  }
  
  return instruction;
}

/**
 * Create a new instruction for a recipe
 */
export async function createInstruction(recipeId, instructionData, userId, userRole) {
  // Check if recipe exists
  const recipe = await recipeRepo.findRecipeById(recipeId);
  if (!recipe) {
    const error = new Error('Recipe not found');
    error.status = 404;
    throw error;
  }

  // Check ownership: user must own the recipe or be admin
  if (userRole !== 'ADMIN' && recipe.userId !== userId) {
    const error = new Error('You can only add instructions to your own recipes');
    error.status = 403;
    throw error;
  }

  const { stepNumber, description } = instructionData;

  // Check if step number already exists for this recipe
  const existingStep = await instructionRepo.findInstructionByRecipeAndStep(recipeId, stepNumber);
  if (existingStep) {
    const error = new Error('Step number already exists for this recipe');
    error.status = 409;
    throw error;
  }

  return await instructionRepo.createInstruction({
    recipeId,
    stepNumber,
    description
  });
}

/**
 * Update instruction by ID
 */
export async function updateInstructionById(instructionId, updateData) {
  // Check if instruction exists
  const instruction = await getInstructionById(instructionId);

  // If step number is being updated, check if it conflicts with another instruction
  if (updateData.stepNumber && updateData.stepNumber !== instruction.stepNumber) {
    const existingStep = await instructionRepo.findInstructionByRecipeAndStep(
      instruction.recipeId,
      updateData.stepNumber
    );
    if (existingStep) {
      const error = new Error('Step number already exists for this recipe');
      error.status = 409;
      throw error;
    }
  }

  return await instructionRepo.updateInstruction(instructionId, updateData);
}

/**
 * Delete instruction by ID
 */
export async function deleteInstructionById(instructionId) {
  // Check if instruction exists
  await getInstructionById(instructionId);
  
  return await instructionRepo.deleteInstruction(instructionId);
}
