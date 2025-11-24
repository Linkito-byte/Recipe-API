
import express from 'express';
import {
  getAllIngredientsHandler,
  getIngredientByIdHandler,
  createIngredientHandler,
  updateIngredientHandler,
  deleteIngredientHandler
} from '../controllers/ingredientController.js';
import { validationResult } from 'express-validator';
import { validateIngredient, validateIngredientUpdate } from '../middleware/validateIngredient.js';

const router = express.Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getAllIngredientsHandler);
router.get('/:id', getIngredientByIdHandler);
router.post('/', validateIngredient, createIngredientHandler);
router.put('/:id', validateIngredientUpdate, updateIngredientHandler);
router.delete('/:id', deleteIngredientHandler);

export default router;
