// src/routes/authRoutes.js
// Authentication routes - Lincoln Manana Santana

import express from 'express';
import {
  registerHandler,
  loginHandler,
} from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
} from '../middleware/validateAuth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, registerHandler);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, loginHandler);

export default router;