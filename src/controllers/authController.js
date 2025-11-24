// src/controllers/authController.js
// Authentication request handlers - Lincoln Manana Santana

import * as authService from '../services/authService.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function registerHandler(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const result = await authService.registerUser({
      username,
      email,
      password
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function loginHandler(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({
      email,
      password
    });

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current user profile
 * GET /api/users/me
 * Requires authentication
 */
export async function getMeHandler(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Update current user profile
 * PUT /api/users/me
 * Requires authentication
 */
export async function updateMeHandler(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await authService.updateUserProfile(
      req.user.userId,
      updateData
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current user's recipes
 * GET /api/users/me/recipes
 * Requires authentication
 */
export async function getMyRecipesHandler(req, res, next) {
  try {
    const recipes = await authService.getUserRecipes(req.user.userId);

    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
}

/**
 * Get all users (admin only)
 * GET /api/users
 * Requires admin authentication
 */
export async function getAllUsersHandler(req, res, next) {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * Get user by ID
 * GET /api/users/:id
 * Requires authentication (admin or self)
 */
export async function getUserByIdHandler(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['User ID must be a valid number']
      });
    }

    // Check if user is admin or accessing their own profile
    if (req.user.role !== 'ADMIN' && req.user.userId !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only view your own profile'
      });
    }

    const user = await authService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Update user by ID
 * PUT /api/users/:id
 * Requires authentication (admin or self)
 */
export async function updateUserByIdHandler(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['User ID must be a valid number']
      });
    }

    // Check if user is admin or updating their own profile
    if (req.user.role !== 'ADMIN' && req.user.userId !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only update your own profile'
      });
    }

    const { username, email, password } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await authService.updateUserById(userId, updateData);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user by ID
 * DELETE /api/users/:id
 * Requires authentication (admin or self)
 */
export async function deleteUserByIdHandler(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: ['User ID must be a valid number']
      });
    }

    // Check if user is admin or deleting their own account
    if (req.user.role !== 'ADMIN' && req.user.userId !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own account'
      });
    }

    await authService.deleteUserById(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}