# Render Deployment Guide for Recipe API

## Prerequisites
- GitHub repository with your code pushed
- Render account (sign up at https://render.com)

## Step-by-Step Deployment

### 1. Create PostgreSQL Database on Render

1. Log in to Render dashboard
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name**: `recipe-api-db` (or your preferred name)
   - **Database**: `recipe_api`
   - **User**: Will be auto-generated
   - **Region**: Choose closest to your users (e.g., Oregon (US West))
   - **PostgreSQL Version**: 16 (or latest)
   - **Plan**: Free
4. Click **"Create Database"**
5. Wait for database to provision (takes ~2 minutes)
6. Once ready, copy the **Internal Database URL** (it starts with `postgresql://`)

### 2. Create Web Service on Render

1. From Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Click **"Connect account"** if not already connected
   - Select your repository: `Linkito-byte/Recipe-API`
   - Click **"Connect"**
3. Configure the web service:
   - **Name**: `recipe-api` (this will be part of your URL)
   - **Region**: Same as database (e.g., Oregon)
   - **Branch**: `development` (or `main` if you've merged)
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Set Environment Variables

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"** and add each of these:

   ```
   Key: DATABASE_URL
   Value: [Paste the Internal Database URL from Step 1]
   
   Key: JWT_SECRET
   Value: [Generate a strong random string, at least 32 characters]
   Example: your-super-secret-production-jwt-key-2025
   
   Key: JWT_EXPIRES_IN
   Value: 24h
   
   Key: NODE_ENV
   Value: production
   
   Key: PORT
   Value: 10000
   ```

   **Important**: For `JWT_SECRET`, use a strong, unique value. You can generate one with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Run build command:
     - Generate Prisma client
     - Run database migrations
     - Seed the database
   - Start your server

3. Monitor the deployment logs in real-time
4. Deployment takes ~3-5 minutes

### 5. Verify Deployment

Once deployment completes, you'll see:
- **Status**: "Live" (green indicator)
- **URL**: Something like `https://recipe-api-xxxx.onrender.com`

Test your API:
1. Visit `https://your-app-url.onrender.com/health` - should return `{"status":"ok"}`
2. Visit `https://your-app-url.onrender.com/api-docs` - should show Swagger UI
3. Test authentication:
   ```bash
   POST https://your-app-url.onrender.com/api/auth/login
   Body: {"email": "admin@recipeapi.com", "password": "password123"}
   ```

### 6. Important Notes

**Free Tier Limitations:**
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30-60 seconds (cold start)
- 750 hours/month free (enough for one service)

**Database Seeding:**
- The build script automatically seeds the database
- Test credentials are available immediately:
  - Admin: `admin@recipeapi.com` / `password123`
  - User: `user@recipeapi.com` / `password123`

**Troubleshooting:**
- If build fails, check the logs for errors
- Common issues:
  - Database connection: Verify `DATABASE_URL` is correct
  - Prisma issues: Make sure `prisma` is in `devDependencies`
  - bcrypt issues: Render should handle this automatically

### 7. Update Your README

Once deployed, update your README.md with:
```markdown
## Deployment

**Live API**: https://your-app-url.onrender.com
**API Documentation**: https://your-app-url.onrender.com/api-docs

### Test Credentials
- Admin: admin@recipeapi.com / password123
- User: user@recipeapi.com / password123
```

### 8. Continuous Deployment

Render automatically redeploys when you push to your connected branch:
```bash
git add .
git commit -m "Update feature"
git push origin development
```
Render detects the push and redeploys automatically.

## Next Steps

After deployment is successful:
1. Test all endpoints using Swagger UI
2. Set up Postman collection pointing to your live URL
3. Update README with deployed URL
4. Share deployed URL with your team

## Support

- Render Documentation: https://render.com/docs
- If deployment fails, check logs in Render dashboard
- Database issues: Verify connection string in environment variables
