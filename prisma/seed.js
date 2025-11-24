import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

async function main() {
  console.log('Starting database seed...');

  // Clear existing data in correct order
  await prisma.recipeIngredient.deleteMany();
  await prisma.instruction.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      username: 'chef_admin',
      email: 'admin@recipeapi.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  // Create Regular User
  const regularUser = await prisma.user.create({
    data: {
      username: 'home_cook',
      email: 'user@recipeapi.com',
      password: hashedPassword,
      role: 'USER'
    }
  });

  console.log('Created 2 users (1 admin, 1 regular)');

  // Create Ingredients
  const ingredients = [
    { name: 'Chicken Breast', unit: 'oz' },
    { name: 'Flour', unit: 'cup' },
    { name: 'Salt', unit: 'tsp' },
    { name: 'Black Pepper', unit: 'tsp' },
    { name: 'Olive Oil', unit: 'tbsp' },
    { name: 'Garlic', unit: 'clove' },
    { name: 'Butter', unit: 'tbsp' },
    { name: 'Paprika', unit: 'tsp' },
    { name: 'Lemon', unit: 'whole' },
    { name: 'Parsley', unit: 'tbsp' },
    { name: 'Onion', unit: 'whole' },
    { name: 'Tomato', unit: 'whole' },
    { name: 'Rice', unit: 'cup' },
    { name: 'Cheese', unit: 'cup' },
    { name: 'Milk', unit: 'cup' }
  ];

  await prisma.ingredient.createMany({ data: ingredients });

  console.log(`Created ${ingredients.length} ingredients`);

  // Fetch ingredients for use in recipes
  const chickenBreast = await prisma.ingredient.findUnique({ where: { name: 'Chicken Breast' } });
  const flour = await prisma.ingredient.findUnique({ where: { name: 'Flour' } });
  const salt = await prisma.ingredient.findUnique({ where: { name: 'Salt' } });
  const pepper = await prisma.ingredient.findUnique({ where: { name: 'Black Pepper' } });
  const oliveOil = await prisma.ingredient.findUnique({ where: { name: 'Olive Oil' } });
  const garlic = await prisma.ingredient.findUnique({ where: { name: 'Garlic' } });
  const paprika = await prisma.ingredient.findUnique({ where: { name: 'Paprika' } });
  const lemon = await prisma.ingredient.findUnique({ where: { name: 'Lemon' } });
  const parsley = await prisma.ingredient.findUnique({ where: { name: 'Parsley' } });

  // Recipe 1: Baked Chicken (Admin)
  await prisma.recipe.create({
    data: {
      title: 'Baked Chicken',
      description: 'A simple and delicious baked chicken recipe perfect for weeknight dinners.',
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
          { stepNumber: 1, description: 'Preheat oven to 425°F (220°C).' },
          { stepNumber: 2, description: 'Remove chicken breast from package and pat dry with paper towels.' },
          { stepNumber: 3, description: 'Season chicken breast with salt, pepper, and paprika on both sides.' },
          { stepNumber: 4, description: 'Drizzle olive oil over chicken and rub to coat evenly.' },
          { stepNumber: 5, description: 'Place seasoned chicken breast on an oven-safe baking pan lined with parchment paper.' },
          { stepNumber: 6, description: 'Bake for 40-45 minutes or until internal temperature reaches 165°F (74°C).' },
          { stepNumber: 7, description: 'Let rest for 5 minutes before serving.' }
        ]
      }
    }
  });

  // Recipe 2: Fried Chicken (Regular User)
  await prisma.recipe.create({
    data: {
      title: 'Fried Chicken',
      description: 'Crispy and juicy fried chicken with a golden brown coating.',
      prepTime: 30,
      cookTime: 25,
      servings: 2,
      userId: regularUser.userId,
      recipeIngredients: {
        create: [
          { ingredientId: chickenBreast.ingredientId, quantity: 8.0, notes: 'cut into pieces' },
          { ingredientId: flour.ingredientId, quantity: 2.0 },
          { ingredientId: salt.ingredientId, quantity: 1.0 },
          { ingredientId: pepper.ingredientId, quantity: 1.0 }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'Cut chicken into uniform pieces for even cooking.' },
          { stepNumber: 2, description: 'In a large bowl, mix flour, salt, and pepper thoroughly.' },
          { stepNumber: 3, description: 'Coat each chicken piece in the flour mixture, shaking off excess.' },
          { stepNumber: 4, description: 'Heat 2 inches of oil in a deep pan to 350°F (175°C).' },
          { stepNumber: 5, description: 'Carefully place chicken pieces in hot oil, don\'t overcrowd the pan.' },
          { stepNumber: 6, description: 'Fry for 12-15 minutes, turning occasionally, until golden brown and cooked through.' },
          { stepNumber: 7, description: 'Remove from oil and drain on paper towels. Serve hot.' }
        ]
      }
    }
  });

  // Recipe 3: Grilled Chicken (Admin)
  await prisma.recipe.create({
    data: {
      title: 'Grilled Chicken',
      description: 'Tender grilled chicken with a zesty lemon garlic marinade.',
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
          { ingredientId: parsley.ingredientId, quantity: 2.0, notes: 'fresh, chopped' }
        ]
      },
      instructions: {
        create: [
          { stepNumber: 1, description: 'In a bowl, mix olive oil, minced garlic, lemon juice, salt, and pepper to create marinade.' },
          { stepNumber: 2, description: 'Place chicken in marinade and coat thoroughly. Cover and refrigerate for 30 minutes.' },
          { stepNumber: 3, description: 'Preheat grill to medium-high heat (about 400°F).' },
          { stepNumber: 4, description: 'Remove chicken from marinade and let excess drip off.' },
          { stepNumber: 5, description: 'Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F.' },
          { stepNumber: 6, description: 'Remove from grill and let rest for 5 minutes.' },
          { stepNumber: 7, description: 'Garnish with fresh chopped parsley before serving.' }
        ]
      }
    }
  });

  console.log('Created 3 recipes with ingredients and instructions');

  // Get final counts
  const userCount = await prisma.user.count();
  const ingredientCount = await prisma.ingredient.count();
  const recipeCount = await prisma.recipe.count();
  const instructionCount = await prisma.instruction.count();
  const recipeIngredientCount = await prisma.recipeIngredient.count();

  console.log('\nDatabase seeding completed successfully!');
  console.log('\nSummary:');
  console.log(`   - Users: ${userCount} (1 admin, 1 regular)`);
  console.log(`   - Ingredients: ${ingredientCount}`);
  console.log(`   - Recipes: ${recipeCount}`);
  console.log(`   - Instructions: ${instructionCount}`);
  console.log(`   - Recipe-Ingredient associations: ${recipeIngredientCount}`);
  console.log('\nTest Credentials:');
  console.log('   Admin:');
  console.log('     Email: admin@recipeapi.com');
  console.log('     Password: password123');
  console.log('   User:');
  console.log('     Email: john@example.com');
  console.log('     Password: password123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });