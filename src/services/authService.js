// src/services/authService.js
// Authentication business logic - Lincoln Manana Santana

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepo.js';

/**
 * Register a new user
 */
export async function registerUser(userData) {
  const { username, email, password } = userData;

  // Check if email already exists
  const existingEmail = await userRepo.findUserByEmail(email);
  if (existingEmail) {
    const error = new Error('Email already in use');
    error.status = 409;
    throw error;
  }

  // Check if username already exists
  const existingUsername = await userRepo.findUserByUsername(username);
  if (existingUsername) {
    const error = new Error('Username already taken');
    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await userRepo.createUser({
    username,
    email,
    password: hashedPassword,
    role: 'USER' // Default role
  });

  // Generate JWT token
  const token = generateToken(newUser);

  return {
    user: newUser,
    token
  };
}

/**
 * Login user
 */
export async function loginUser(credentials) {
  const { email, password } = credentials;

  // Find user by email
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Remove password from user object
  const { password: _, ...userWithoutPassword } = user;

  // Generate JWT token
  const token = generateToken(userWithoutPassword);

  return {
    user: userWithoutPassword,
    token
  };
}

/**
 * Get current user profile
 */
export async function getCurrentUser(userId) {
  const user = await userRepo.findUserById(userId);
  
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, updateData) {
  // Check if user exists
  const user = await userRepo.findUserById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  // If email is being updated, check if it's already taken
  if (updateData.email && updateData.email !== user.email) {
    const existingEmail = await userRepo.findUserByEmail(updateData.email);
    if (existingEmail) {
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }
  }

  // If username is being updated, check if it's already taken
  if (updateData.username && updateData.username !== user.username) {
    const existingUsername = await userRepo.findUserByUsername(updateData.username);
    if (existingUsername) {
      const error = new Error('Username already taken');
      error.status = 409;
      throw error;
    }
  }

  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Update user
  return await userRepo.updateUser(userId, updateData);
}

/**
 * Get user's recipes
 */
export async function getUserRecipes(userId) {
  return await userRepo.getUserRecipes(userId);
}

/**
 * Generate JWT token
 */
function generateToken(user) {
  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
}