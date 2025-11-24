// src/middleware/validateIngredient.js
// Ingredient validation middleware - Giani Hill

import { body } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

/**
 * Validation rules for creating an ingredient
 */
export const validateIngredient = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Ingredient name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Ingredient name must be between 2 and 100 characters'),

  body('unit')
    .trim()
    .notEmpty()
    .withMessage('Unit is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit must be between 1 and 20 characters'),

  checkValidationResults,
];

/**
 * Validation rules for updating an ingredient
 */
export const validateIngredientUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Ingredient name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Ingredient name must be between 2 and 100 characters'),

  body('unit')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Unit cannot be empty')
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit must be between 1 and 20 characters'),

  checkValidationResults,
];
