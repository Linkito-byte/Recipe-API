// src/routes/instructionRoutes.js
// Instruction routes - Richard Gutknecht

import express from 'express';
import {
  getInstructionByIdHandler,
  updateInstructionHandler,
  deleteInstructionHandler,
} from '../controllers/instructionController.js';
import { authenticate } from '../middleware/auth.js';
import { validateInstructionUpdate } from '../middleware/validateInstruction.js';

const router = express.Router();

/**
 * @route   GET /api/instructions/:id
 * @desc    Get instruction by ID
 * @access  Public
 */
router.get('/:id', getInstructionByIdHandler);

/**
 * @route   PUT /api/instructions/:id
 * @desc    Update instruction by ID
 * @access  Private (owner or admin)
 */
router.put('/:id', authenticate, validateInstructionUpdate, updateInstructionHandler);

/**
 * @route   DELETE /api/instructions/:id
 * @desc    Delete instruction by ID
 * @access  Private (owner or admin)
 */
router.delete('/:id', authenticate, deleteInstructionHandler);

export default router;
