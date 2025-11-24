// src/repositories/userRepo.js
// User data access layer - Lincoln Manana Santana

import prisma from '../config/db.js';

/**
 * Find user by email
 */
export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      userId: true,
      username: true,
      email: true,
      password: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

/**
 * Find user by ID
 */
export async function findUserById(userId) {
  return prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

/**
 * Find user by username
 */
export async function findUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

/**
 * Create a new user
 */
export async function createUser(userData) {
  return prisma.user.create({
    data: userData,
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

/**
 * Update user by ID
 */
export async function updateUser(userId, updateData) {
  return prisma.user.update({
    where: { userId },
    data: updateData,
    select: {
      userId: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

/**
 * Delete user by ID
 */
export async function deleteUser(userId) {
  return prisma.user.delete({
    where: { userId }
  });
}

/**
 * Get user's recipes
 */
export async function getUserRecipes(userId) {
  return prisma.recipe.findMany({
    where: { userId },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true
        }
      },
      instructions: {
        orderBy: {
          stepNumber: 'asc'
        }
      }
    }
  });
}