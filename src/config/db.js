// src/config/db.js
// Database configuration and Prisma client
// Jonny Pretell - Database and Core Infrastructure

import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error'] 
    : ['error'],
});

export default prisma;