# ExpenseTrack API Server

Node.js + Express + MongoDB + Mongoose + TypeScript server with modular architecture and JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- pnpm package manager

### Installation

Dependencies are already installed. If you need to reinstall:
```bash
pnpm install
```

### Environment Variables

The `.env` file has been created with default values. Update these as needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expensetrack
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Running the Server

**Development mode (with hot reload):**
```bash
pnpm dev
```

**Build for production:**
```bash
pnpm build
```

**Run production build:**
```bash
pnpm start
```

---

## 📁 Project Structure

```
apps/server/
├── src/
│   ├── config/
│   │   └── database.ts              # MongoDB connection
│   ├── modules/
│   │   └── user/                    # User module
│   │       ├── user.model.ts        # Mongoose User model
│   │       ├── user.repo.ts         # Repository (DB operations)
│   │       ├── user.service.ts      # Business logic
│   │       └── user.routes.ts       # Route definitions
│   ├── middleware/
│   │   ├── auth.middleware.ts       # JWT authentication
│   │   └── errorHandler.ts          # Global error handler
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── utils/
│   │   ├── jwt.utils.ts             # JWT utilities
│   │   └── password.utils.ts        # Password hashing
│   └── server.ts                    # Main server file
├── .env                              # Environment variables
├── .env.example                      # Example env file
├── .gitignore                        # Git ignore
├── tsconfig.json                     # TypeScript config
└── package.json                      # Package config
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication (Public)

#### Register User
```http
POST /api/v1/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### User Management (Protected - Requires JWT Token)

All protected routes require the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get Current User
```http
GET /api/v1/users/me
Authorization: Bearer <token>
```

#### Get All Users
```http
GET /api/v1/users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /api/v1/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/v1/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete User
```http
DELETE /api/v1/users/:id
Authorization: Bearer <token>
```

---

## 🏗️ Architecture

### Modular Structure

Each module follows the **Repository → Service → Routes** pattern:

1. **Model** (`*.model.ts`) - Mongoose schema and model definition
2. **Repository** (`*.repo.ts`) - Database operations (CRUD)
3. **Service** (`*.service.ts`) - Business logic
4. **Routes** (`*.routes.ts`) - HTTP endpoints and request handling

### Adding New Modules

To add a new module (e.g., `expense`):

1. Create folder: `src/modules/expense/`
2. Create files:
   - `expense.model.ts` - Define Mongoose schema
   - `expense.repo.ts` - Database operations
   - `expense.service.ts` - Business logic
   - `expense.routes.ts` - Define routes with `defineExpenseRoutes(app, baseUrl)`
3. Import and mount in `src/server.ts`:
   ```typescript
   import { defineExpenseRoutes } from './modules/expense/expense.routes';
   defineExpenseRoutes(app, API_PREFIX);
   ```

---

## 🔐 Authentication

JWT-based authentication is implemented via middleware.

### How It Works

1. User registers or logs in → receives JWT token
2. Client includes token in `Authorization` header for protected routes
3. `authenticate` middleware verifies token and attaches user to request
4. Routes can access authenticated user via `req.user`

### Protecting Routes

```typescript
import { authenticate } from '../../middleware/auth.middleware';

router.get('/protected', authenticate, async (req: AuthRequest, res: Response) => {
  // req.user is available here
  res.json({ user: req.user });
});
```

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Current User (with token):**
```bash
curl http://localhost:5000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Thunder Client

1. Import the base URL: `http://localhost:5000/api/v1`
2. Create requests for each endpoint
3. For protected routes, add `Authorization: Bearer <token>` header

---

## 🛠️ Development

### TypeScript Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { connectDB } from '@config/database';
import { authenticate } from '@middleware/auth.middleware';
import { UserService } from '@modules/user/user.service';
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@modules/*": ["modules/*"],
  "@config/*": ["config/*"],
  "@middleware/*": ["middleware/*"],
  "@types/*": ["types/*"],
  "@utils/*": ["utils/*"]
}
```

---

## 📝 Notes

- **MongoDB**: Make sure MongoDB is running before starting the server
- **JWT Secret**: Change `JWT_SECRET` in production to a secure random string
- **CORS**: Currently allows all origins. Configure for production in `src/server.ts`
- **Error Handling**: Global error handler is in place for consistent error responses

---

## 🎯 Next Steps

1. Start MongoDB (if not running)
2. Run `pnpm dev` to start the server
3. Test the API endpoints
4. Add more modules (expense, category, etc.)
5. Implement additional features (validation, logging, etc.)

---

**Happy Coding! 🚀**
