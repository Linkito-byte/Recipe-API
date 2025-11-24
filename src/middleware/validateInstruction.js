// src/middleware/validateInstruction.js
// Instruction validation middleware - Richard Gutknecht

import { body } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

/**
 * Validation rules for creating an instruction
 */
export const validateInstruction = [
  body('stepNumber')
    .isInt({ min: 1 })
    .withMessage('Step number must be a positive integer'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters'),

  checkValidationResults,
];

/**
 * Validation rules for updating an instruction
 */
export const validateInstructionUpdate = [
  body('stepNumber')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Step number must be a positive integer'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters'),

  checkValidationResults,
];
