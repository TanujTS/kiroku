# Blog Application

A simple blog application built with TypeScript, Express.js, and PostgreSQL.

## 🏗️ Project Structure

```
blog-app/
├── src/
│   ├── config/          # Database and app configuration
│   │   └── database.ts  # PostgreSQL connection setup
│   ├── controllers/     # Business logic for handling requests
│   │   └── postController.ts
│   ├── routes/          # API endpoint definitions
│   │   └── posts.ts
│   ├── middleware/      # Custom middleware (auth, validation, etc.)
│   ├── models/          # Database models (for future use)
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Main type definitions
│   └── index.ts         # Main application entry point
├── public/              # Static files
├── .env                 # Environment variables
├── database.sql         # Database schema setup
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL installed and running
- Basic knowledge of TypeScript and SQL

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL Database**
   ```bash
   # Create a new database
   createdb blog_db
   
   # Run the schema setup
   psql -d blog_db -f database.sql
   ```

3. **Configure Environment Variables**
   Update the `.env` file with your database credentials:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/blog_db
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3000`

## 📚 Learning Concepts

### File Structure Explained

- **`src/config/`**: Configuration files (database connection, app settings)
- **`src/controllers/`**: Contains the business logic. Controllers handle the actual work of processing requests
- **`src/routes/`**: Defines API endpoints and maps them to controller functions
- **`src/types/`**: TypeScript type definitions for better type safety
- **`src/middleware/`**: Custom functions that run between requests and responses

### API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post

### Key Learning Points

1. **TypeScript Interfaces**: Define the shape of your data (User, Post, Comment)
2. **Express.js Structure**: Separation of routes, controllers, and middleware
3. **PostgreSQL**: Using parameterized queries to prevent SQL injection
4. **Error Handling**: Proper error responses and logging
5. **Environment Variables**: Keeping sensitive data out of your code

## 🎯 Next Steps

1. Add user authentication (register/login)
2. Add middleware for protected routes
3. Implement update and delete operations
4. Add input validation
5. Add user comments functionality

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Run the production build
