# Recipe API

Backend API for managing and sharing recipes - ITIS 4166-051 Group 17

## Team Members
- **Jonny Pretell** - Database and Core Infrastructure
- **Lincoln Manana Santana** - Authentication and User Management
- **Giani Hill** - Recipe and Ingredient Management
- **Richard Gutknecht** - Instruction and Testing

## Tech Stack
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/recipe-api.git
cd recipe-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Seed the database (optional):
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:3000`

## API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` for interactive API documentation.

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run migrate:dev` - Run Prisma migrations in development
- `npm run seed` - Seed the database with sample data
- `npm run prisma:generate` - Generate Prisma Client

## Project Structure
```
recipe-api/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── repositories/
│   ├── services/
│   ├── utils/
│   └── server.js
├── tests/
├── public/
└── docs/
```

## License

ISC
