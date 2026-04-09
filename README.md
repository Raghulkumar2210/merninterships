# Personal Finance Income/Expense App - MERN Stack

## Project Structure

```
Final Project 1/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── incomeController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Income.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── income.js
│   │   └── expense.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── AddIncome.js
    │   │   ├── AddExpense.js
    │   │   ├── IncomeList.js
    │   │   └── ExpenseList.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── AuthContext.js
    │   └── App.js
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Income (Protected Routes)
- `GET /api/income` - Get all user incomes
- `POST /api/income` - Create new income
- `PUT /api/income/:id` - Update income
- `DELETE /api/income/:id` - Delete income

### Expense (Protected Routes)
- `GET /api/expense` - Get all user expenses
- `POST /api/expense` - Create new expense
- `PUT /api/expense/:id` - Update expense
- `DELETE /api/expense/:id` - Delete expense

## Authentication Flow

1. **Registration/Login**: User provides credentials → Server validates → JWT token generated
2. **Token Storage**: Token stored in localStorage
3. **API Requests**: Axios interceptor attaches token to all requests
4. **Route Protection**: ProtectedRoute component checks authentication
5. **Server Validation**: Auth middleware verifies token on protected routes

## Setup Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Update `.env` file with your MongoDB URI
4. Start server: `npm run dev` (runs on port 5000)

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start React app: `npm start` (runs on port 3000)

## Sample API Request/Response

### Login Request
```javascript
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response
```javascript
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### Protected API Request
```javascript
GET http://localhost:5000/api/income
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Features Implemented

✅ User registration and login with bcrypt password hashing
✅ JWT authentication with 7-day expiration
✅ Protected routes on both frontend and backend
✅ CRUD operations for income and expenses
✅ User-specific data (each record linked to logged-in user)
✅ Axios interceptor for automatic token attachment
✅ React Router for navigation
✅ Clean folder structure
✅ CORS enabled
✅ Environment variables
✅ JSON-only responses