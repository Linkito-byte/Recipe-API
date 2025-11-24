// src/middleware/authorize.js
// Authorization middleware - Lincoln Manana Santana
// Role-based and ownership-based authorization

/**
 * Middleware to check if user has required role(s)
 * @param {string|string[]} roles - Required role(s) (e.g., 'ADMIN' or ['ADMIN', 'USER'])
 */
export function authorizeRole(...roles) {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'You must be logged in to access this resource' 
      });
    }

    // Check if user has required role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: 'You do not have permission to access this resource' 
      });
    }

    next();
  };
}

/**
 * Middleware to check if user is ADMIN
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'You must be logged in to access this resource' 
    });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'Admin access required' 
    });
  }

  next();
}

/**
 * Middleware to check if user owns the resource or is admin
 * Expects resource owner ID to be available in req.resourceOwnerId
 * This should be set by the controller before calling this middleware
 */
export function requireOwnershipOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'You must be logged in to access this resource' 
    });
  }

  // Admin can access any resource
  if (req.user.role === 'ADMIN') {
    return next();
  }

  // Check ownership
  if (!req.resourceOwnerId) {
    return res.status(500).json({ 
      error: 'Server error',
      message: 'Resource ownership check not configured' 
    });
  }

  if (req.resourceOwnerId !== req.user.userId) {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'You can only modify your own resources' 
    });
  }

  next();
}