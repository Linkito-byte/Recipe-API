// src/middleware/auth.js
// Authentication middleware - Lincoln Manana Santana
// JWT token validation

import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate JWT tokens
 * Extracts token from Authorization header and verifies it
 * Adds user info to req.user if valid
 */
export function authenticate(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No token provided' 
      });
    }

    // Check if Bearer token format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Invalid token format. Use: Bearer <token>' 
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Token expired' 
      });
    }

    return res.status(500).json({ 
      error: 'Authentication error',
      message: 'Could not authenticate token' 
    });
  }
}

/**
 * Optional authentication - doesn't fail if no token
 * Used for endpoints that work with or without auth
 */
export function optionalAuthenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    // If token is invalid, just set user to null
    req.user = null;
    next();
  }
}