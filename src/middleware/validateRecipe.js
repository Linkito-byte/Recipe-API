// src/middleware/validateRecipe.js
// Recipe validation middleware

import { body } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateRecipe = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('prepTime')
    .isInt({ min: 0 })
    .withMessage('Prep time must be a positive integer'),

  body('cookTime')
    .isInt({ min: 0 })
    .withMessage('Cook time must be a positive integer'),

  body('servings')
    .isInt({ min: 1 })
    .withMessage('Servings must be at least 1'),

  body('userId')
    .isInt()
    .withMessage('User ID must be a valid integer'),

  checkValidationResults,
];

export const validateRecipeUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('prepTime')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Prep time must be a positive integer'),

  body('cookTime')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Cook time must be a positive integer'),

  body('servings')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Servings must be at least 1'),

  checkValidationResults,
];
