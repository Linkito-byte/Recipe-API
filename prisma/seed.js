// prisma/seed.js
// Database seeding script with sample recipe data
// Jonny Pretell - Database and Core Infrastructure

import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in order due to foreign keys)
  await prisma.recipeIngredient.deleteMany();
  await prisma.instruction.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

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

  const regularUser = await prisma.user.create({
    data: {
      username: 'home_cook',
      email: 'user@recipeapi.com',
      password: hashedPassword,
      role: 'USER'
    }
  });

  console.log('Created 2 users');

  // Create ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: 'Chicken Breast', unit: 'oz' },
      { name: 'Flour', unit: 'cup' },
      { name: 'Salt', unit: 'tsp' },
      { name: 'Black Pepper', unit: 'tsp' },
      { name: 'Olive Oil', unit: 'tbsp' },
      { name: 'Garlic', unit: 'cloves' },
      { name: 'Butter', unit: 'tbsp' },
      { name: 'Paprika', unit: 'tsp' },
      { name: 'Lemon', unit: 'whole' },
      { name: 'Parsley', unit: 'tbsp' }
    ]
  });

  console.log('Created 10 ingredients');

  // Fetch ingredients to get their IDs
  const chickenBreast = await prisma.ingredient.findUnique({ where: { name: 'Chicken Breast' } });
  const flour = await prisma.ingredient.findUnique({ where: { name: 'Flour' } });
  const salt = await prisma.ingredient.findUnique({ where: { name: 'Salt' } });
  const pepper = await prisma.ingredient.findUnique({ where: { name: 'Black Pepper' } });
  const oliveOil = await prisma.ingredient.findUnique({ where: { name: 'Olive Oil' } });
  const garlic = await prisma.ingredient.findUnique({ where: { name: 'Garlic' } });
  const butter = await prisma.ingredient.findUnique({ where: { name: 'Butter' } });
  const paprika = await prisma.ingredient.findUnique({ where: { name: 'Paprika' } });
  const lemon = await prisma.ingredient.findUnique({ where: { name: 'Lemon' } });
  const parsley = await prisma.ingredient.findUnique({ where: { name: 'Parsley' } });

  // Create recipes with ingredients and instructions
  const bakedChicken = await prisma.recipe.create({
    data: {
      title: 'Baked Chicken',
      description: 'This is a recipe for baked chicken.',
      prepTime: 30,
      cookTime: 45,
      servings: 3,
      userId: adminUser.userId,
      recipeIngredients: {
        create: [
          { ingredientId: chickenBreast.ingredientId, quantity: 12.0, notes: 'boneless, skinless' },
          { ingredientId: salt.ingredientId, quantity: 1.0 },
          { ingredientId: pepper.ingredientId, quantity: 0.5 },
          { ingredientId: oliveOil.ingredientId, quantity: 2.0 },
          { ingredientId: paprika.ingredientId, quantity: 1.0 }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'Remove chicken breast from package.' },
          { stepNumber: 2, description: 'Season chicken breast with salt, pepper, and paprika.' },
          { stepNumber: 3, description: 'Drizzle with olive oil.' },
          { stepNumber: 4, description: 'Place seasoned chicken breast on an oven safe baking pan.' },
          { stepNumber: 5, description: 'Preheat oven to 425 degrees.' },
          { stepNumber: 6, description: 'Bake for 45 minutes or until internal temperature reaches 165°F.' }
        ]
      }
    }
  });

  const friedChicken = await prisma.recipe.create({
    data: {
      title: 'Fried Chicken',
      description: 'This is a recipe for fried chicken.',
      prepTime: 30,
      cookTime: 25,
      servings: 2,
      userId: regularUser.userId,
      recipeIngredients: {
        create: [
          { ingredientId: chickenBreast.ingredientId, quantity: 8.0 },
          { ingredientId: flour.ingredientId, quantity: 2.0 },
          { ingredientId: salt.ingredientId, quantity: 1.0 },
          { ingredientId: pepper.ingredientId, quantity: 1.0 }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'Cut chicken into pieces.' },
          { stepNumber: 2, description: 'Mix flour, salt, and pepper in a bowl.' },
          { stepNumber: 3, description: 'Coat chicken pieces in flour mixture.' },
          { stepNumber: 4, description: 'Heat oil in a deep pan to 350°F.' },
          { stepNumber: 5, description: 'Fry chicken for 12-15 minutes until golden brown.' }
        ]
      }
    }
  });

  const grilledChicken = await prisma.recipe.create({
    data: {
      title: 'Grilled Chicken',
      description: 'This is a recipe for grilled chicken.',
      prepTime: 30,
      cookTime: 15,
      servings: 4,
      userId: adminUser.userId,
      recipeIngredients: {
        create: [
          { ingredientId: chickenBreast.ingredientId, quantity: 16.0 },
          { ingredientId: salt.ingredientId, quantity: 1.0 },
          { ingredientId: pepper.ingredientId, quantity: 1.0 },
          { ingredientId: oliveOil.ingredientId, quantity: 3.0 },
          { ingredientId: garlic.ingredientId, quantity: 3.0, notes: 'minced' },
          { ingredientId: lemon.ingredientId, quantity: 1.0, notes: 'juiced' },
          { ingredientId: parsley.ingredientId, quantity: 2.0, notes: 'chopped' }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'Mix olive oil, minced garlic, lemon juice, salt, and pepper.' },
          { stepNumber: 2, description: 'Marinate chicken in the mixture for 30 minutes.' },
          { stepNumber: 3, description: 'Preheat grill to medium-high heat.' },
          { stepNumber: 4, description: 'Grill chicken for 6-7 minutes per side.' },
          { stepNumber: 5, description: 'Garnish with fresh parsley before serving.' }
        ]
      }
    }
  });

  console.log('Created 3 recipes with ingredients and instructions');

  console.log('\nDatabase seeding completed successfully!');
  console.log('\nSummary:');
  console.log(`   - Users: 2`);
  console.log(`   - Ingredients: 10`);
  console.log(`   - Recipes: 3`);
  console.log(`   - Instructions: 16`);
  console.log('\nTest credentials:');
  console.log(`   - Admin: admin@recipeapi.com / password123`);
  console.log(`   - User: user@recipeapi.com / password123`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });