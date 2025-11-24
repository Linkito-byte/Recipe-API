// src/middleware/validateIngredient.js
// Ingredient validation middleware

import { body } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';
import prisma from '../config/db.js';

export const validateIngredient = [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({min: 3, max: 100 })
      .withMessage('Name must be between 3 and 100 characters')
      .custom(async (value) => {
        const exists = await prisma.ingredient.findUnique({
            where: { name: value}
        });
        if (exists) {
            throw new Error('Ingredient name must be unique');
        }
        return true;
      }),
    
    body('unit')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Unit is required'),
    
    checkValidationResults,   
];

export const validateIngredientUpdate = [
  body('name')
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters')
    .custom(async (value) => {
      const exists = await prisma.ingredient.findUnique({
          where: { name: value}
      });
      if (exists) {
        throw new Error('Ingredient name must be unique');
      }
      return true;
    }),

  body('unit')
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Unit is required'),

  checkValidationResults,
];