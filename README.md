# Recipe API

Backend API for managing and sharing recipes - ITIS 4166-051 Group 17

## Team Members

| Name | GitHub Username | Role |
|------|----------------|------|
| **Jonny Pretell** | @jonny-pretell | Database and Core Infrastructure |
| **Lincoln Manana Santana** | @lincoln-santana | Authentication and User Management |
| **Giani Hill** | @giani-hill | Recipe and Ingredient Management |
| **Richard Gutknecht** | @richard-gutknecht | Instruction and Testing |

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest + Supertest

## Project Structure

```
recipe-api/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.js            # Seed data script
│   └── migrations/        # Database migrations
├── src/
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, validation, error handling
│   ├── routes/          # API route definitions
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic layer
│   ├── utils/           # Helper functions
│   ├── generated/       # Prisma client (auto-generated)
│   └── server.js        # App entry point
├── tests/               # Test files
├── docs/                # API documentation
└── public/              # Static files (Swagger)
```

## API Resources

### Main Resources
1. **Users** - User accounts and authentication
2. **Recipes** - Recipe management with CRUD operations
3. **Ingredients** - Ingredient catalog
4. **Instructions** - Step-by-step recipe instructions
5. **RecipeIngredients** - Junction table linking recipes and ingredients

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/recipe-api.git
   cd recipe-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/recipe_api"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="24h"
   PORT=3000
   NODE_ENV="development"
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

7. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3000`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm start` | Start production server |
| `npm run migrate:dev` | Run Prisma migrations in development |
| `npm run migrate:deploy` | Run Prisma migrations in production |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run seed` | Seed database with sample data |
| `npm test` | Run test suite |

## API Documentation

Once the server is running, visit:
- **Swagger UI:** `http://localhost:3000/api-docs`
- **API Base URL:** `http://localhost:3000/api`

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token

1. **Register a new user:**
   ```bash
   POST /api/auth/register
   ```

2. **Login:**
   ```bash
   POST /api/auth/login
   ```

3. **Use the token in requests:**
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Test Credentials (After Seeding)

**Admin User:**
- Email: `admin@recipeapi.com`
- Password: `password123`

**Regular User:**
- Email: `user@recipeapi.com`
- Password: `password123`

## Authorization Rules

### Public Endpoints (No Auth Required)
- `GET /api/recipes` - Browse all recipes
- `GET /api/recipes/:id` - View recipe details
- `GET /api/ingredients` - Browse ingredients

### Authenticated Users Only
- `POST /api/recipes` - Create recipes
- `GET /api/users/me` - View profile
- `PUT /api/users/me` - Update profile

### Ownership-Based Authorization
- `PUT /api/recipes/:id` - Update recipe (owner or admin only)
- `DELETE /api/recipes/:id` - Delete recipe (owner or admin only)

### Admin-Only Authorization
- `PUT /api/ingredients/:id` - Update ingredients
- `DELETE /api/ingredients/:id` - Delete ingredients

## Development Workflow

### Creating a New Feature

1. **Create a feature branch:**
   ```bash
   git switch -c feature/your-feature-name
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

3. **Push to GitHub:**
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **Create a Pull Request on GitHub**

5. **Wait for 2 approvals from teammates**

6. **Merge the PR**

7. **Update your local main:**
   ```bash
   git switch main
   git pull
   ```

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Authentication and authorization
- CRUD operations for all resources
- Input validation
- Error handling
- Database constraints

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user
- `GET /api/users/me/recipes` - Get current user's recipes
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

### Recipes
- `GET /api/recipes` - Get all recipes (Public)
- `GET /api/recipes/:id` - Get recipe by ID (Public)
- `POST /api/recipes` - Create recipe (Auth required)
- `PUT /api/recipes/:id` - Update recipe (Owner/Admin)
- `DELETE /api/recipes/:id` - Delete recipe (Owner/Admin)

### Ingredients
- `GET /api/ingredients` - Get all ingredients (Public)
- `GET /api/ingredients/:id` - Get ingredient by ID (Public)
- `POST /api/ingredients` - Create ingredient (Admin only)
- `PUT /api/ingredients/:id` - Update ingredient (Admin only)
- `DELETE /api/ingredients/:id` - Delete ingredient (Admin only)

### Instructions
- `GET /api/recipes/:id/instructions` - Get recipe instructions (Public)
- `GET /api/instructions/:id` - Get instruction by ID (Public)
- `POST /api/recipes/:id/instructions` - Add instruction (Owner/Admin)
- `PUT /api/instructions/:id` - Update instruction (Owner/Admin)
- `DELETE /api/instructions/:id` - Delete instruction (Owner/Admin)

**Total:** 26 endpoints across 5 resource collections

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Create a Pull Request
5. Get 2 approvals
6. Merge to main

## License

ISC

## Deployment

### Production Environment

The Recipe API is deployed and live on Render!

- **Live API:** https://recipe-api-qkaa.onrender.com
- **API Documentation:** https://recipe-api-qkaa.onrender.com/api-docs
- **Health Check:** https://recipe-api-qkaa.onrender.com/health

### Testing the Live API

**Option 1: Swagger UI (Recommended)**
1. Visit https://recipe-api-qkaa.onrender.com/api-docs
2. Select "Production server (Render)" from the servers dropdown
3. Try out any endpoint directly from your browser
4. For authenticated endpoints, click "Authorize" and paste your JWT token

**Option 2: Postman Collection**
- Import our Postman collection (link below) for complete API testing
- Pre-configured with all 26 endpoints organized in 5 folders
- Automatic token management and environment variables

### Production Test Credentials

**Admin Account:**
```
Email: admin@recipeapi.com
Password: password123
```

**Regular User Account:**
```
Email: user@recipeapi.com
Password: password123
```

**Note:** The production database is seeded with sample recipes and ingredients.

### Deployment Notes

- **Platform:** Render (Free Tier)
- **Cold Start:** First request after 15 minutes of inactivity may take 30-60 seconds
- **Database:** PostgreSQL (Render managed)
- **Auto-Deploy:** Pushes to `development` branch trigger automatic redeployment
- **Environment:** Production environment variables configured in Render dashboard

## Links

- **GitHub Repository:** https://github.com/Linkito-byte/Recipe-API
- **Live API:** https://recipe-api-qkaa.onrender.com
- **API Documentation:** https://recipe-api-qkaa.onrender.com/api-docs
- **Postman Collection:** [Share your Postman workspace link here]