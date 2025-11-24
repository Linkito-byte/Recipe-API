// prisma/seed.js
// Database seeding script

import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.recipeIngredient.deleteMany();
  await prisma.instruction.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminUser = await prisma.user.create({
    data: {
      username: 'chef_admin',
      email: 'admin@recipeapi.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Created users');

  // Create ingredients
  const chickenBreast = await prisma.ingredient.create({
    data: { name: 'Chicken Breast', unit: 'oz' }
  });

  const salt = await prisma.ingredient.create({
    data: { name: 'Salt', unit: 'tsp' }
  });

  const pepper = await prisma.ingredient.create({
    data: { name: 'Black Pepper', unit: 'tsp' }
  });

  console.log('Created ingredients');

  // Create recipe
  await prisma.recipe.create({
    data: {
      title: 'Simple Baked Chicken',
      description: 'A simple and delicious baked chicken recipe.',
      prepTime: 15,
      cookTime: 30,
      servings: 2,
      userId: adminUser.userId,
      recipeIngredients: {
        create: [
          { ingredientId: chickenBreast.ingredientId, quantity: 8.0 },
          { ingredientId: salt.ingredientId, quantity: 1.0 },
          { ingredientId: pepper.ingredientId, quantity: 0.5 }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'Preheat oven to 375°F.' },
          { stepNumber: 2, description: 'Season chicken with salt and pepper.' },
          { stepNumber: 3, description: 'Bake for 30 minutes.' }
        ]
      }
    }
  });

  console.log('Created recipe');
  console.log('\nDatabase seeding completed!');
  console.log('Test user: admin@recipeapi.com / password123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
