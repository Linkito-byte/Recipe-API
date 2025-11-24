// src/controllers/instructionController.js
// Instruction request handlers - Richard Gutknecht

import * as instructionService from '../services/instructionService.js';

/**
 * Get all instructions for a recipe
 * GET /api/recipes/:id/instructions
 */
export async function getInstructionsByRecipeIdHandler(req, res, next) {
  try {
    const recipeId = parseInt(req.params.id);
    
    if (isNaN(recipeId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Recipe ID must be a valid number']
      });
    }

    const instructions = await instructionService.getInstructionsByRecipeId(recipeId);
    res.status(200).json(instructions);
  } catch (error) {
    next(error);
  }
}

/**
 * Get instruction by ID
 * GET /api/instructions/:id
 */
export async function getInstructionByIdHandler(req, res, next) {
  try {
    const instructionId = parseInt(req.params.id);
    
    if (isNaN(instructionId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Instruction ID must be a valid number']
      });
    }

    const instruction = await instructionService.getInstructionById(instructionId);
    res.status(200).json(instruction);
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new instruction for a recipe
 * POST /api/recipes/:id/instructions
 */
export async function createInstructionHandler(req, res, next) {
  try {
    const recipeId = parseInt(req.params.id);
    
    if (isNaN(recipeId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Recipe ID must be a valid number']
      });
    }

    const newInstruction = await instructionService.createInstruction(
      recipeId, 
      req.body, 
      req.user.userId, 
      req.user.role
    );
    res.status(201).json({
      message: 'Instruction created successfully',
      instruction: newInstruction
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update instruction by ID
 * PUT /api/instructions/:id
 */
export async function updateInstructionHandler(req, res, next) {
  try {
    const instructionId = parseInt(req.params.id);
    
    if (isNaN(instructionId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Instruction ID must be a valid number']
      });
    }

    // Get instruction to check ownership via recipe
    const instruction = await instructionService.getInstructionById(instructionId);
    
    // Check ownership: user must own the recipe or be admin
    if (req.user.role !== 'ADMIN' && instruction.recipe.userId !== req.user.userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only modify instructions for your own recipes'
      });
    }

    const updatedInstruction = await instructionService.updateInstructionById(instructionId, req.body);
    res.status(200).json({
      message: 'Instruction updated successfully',
      instruction: updatedInstruction
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete instruction by ID
 * DELETE /api/instructions/:id
 */
export async function deleteInstructionHandler(req, res, next) {
  try {
    const instructionId = parseInt(req.params.id);
    
    if (isNaN(instructionId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['Instruction ID must be a valid number']
      });
    }

    // Get instruction to check ownership via recipe
    const instruction = await instructionService.getInstructionById(instructionId);
    
    // Check ownership: user must own the recipe or be admin
    if (req.user.role !== 'ADMIN' && instruction.recipe.userId !== req.user.userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete instructions for your own recipes'
      });
    }

    await instructionService.deleteInstructionById(instructionId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
