# Number Discussion API

A NodeJS + TypeScript backend for a social media-like application where users communicate using numbers and mathematical operations.

## Features

- **User Authentication**: Register and login with username/password
- **Number Discussions**: Users can post starting numbers (like Twitter posts)
- **Mathematical Operations**: Users can reply to any number with operations (+, -, ×, ÷)
- **Tree Structure**: Operations create branching discussion trees
- **In-Memory Storage**: No database required - uses JavaScript arrays/objects
- **JWT Authentication**: Secure token-based authentication
- **CORS Enabled**: Ready for frontend integration

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with username/password

### Discussions
- `GET /api/discussions` - Get all discussions with operation trees (public)
- `POST /api/discussions` - Create a new discussion (authenticated)
- `GET /api/discussions/:id` - Get specific discussion with operation tree (public)

### Operations
- `POST /api/operations` - Create a new operation (authenticated)
- `GET /api/operations/discussion/:discussionId` - Get all operations for a discussion (public)
- `GET /api/operations/:id` - Get specific operation (public)

## Example Usage

### 1. Register a user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "alex", "password": "password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alex", "password": "password123"}'
```

### 3. Create a discussion
```bash
curl -X POST http://localhost:5000/api/discussions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"startingNumber": 10}'
```

### 4. Add an operation
```bash
curl -X POST http://localhost:5000/api/operations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "discussionId": "DISCUSSION_ID",
    "parentId": null,
    "operationType": "add",
    "rightNumber": 5
  }'
```

## Data Structure Example

```json
{
  "id": "discussion_1",
  "startingNumber": 10,
  "createdBy": "user_1",
  "createdByUsername": "alex",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "operations": [
    {
      "id": "op_1",
      "discussionId": "discussion_1",
      "parentId": null,
      "operationType": "add",
      "rightNumber": 5,
      "result": 15,
      "createdBy": "user_2",
      "createdByUsername": "george",
      "createdAt": "2024-01-01T01:00:00.000Z",
      "children": [
        {
          "id": "op_2",
          "discussionId": "discussion_1",
          "parentId": "op_1",
          "operationType": "multiply",
          "rightNumber": 2,
          "result": 30,
          "createdBy": "user_3",
          "createdByUsername": "masha",
          "createdAt": "2024-01-01T02:00:00.000Z",
          "children": []
        }
      ]
    }
  ]
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
FRONTEND_URL=http://localhost:3000
```

## Technology Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
backend/
├── src/
│   ├── data/
│   │   └── storage.ts          # In-memory data storage
│   ├── middleware/
│   │   └── auth.ts             # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts             # Authentication routes
│   │   ├── discussions.ts      # Discussion routes
│   │   └── operations.ts       # Operation routes
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── server.ts               # Main Express application
├── package.json
└── tsconfig.json
```

## Health Check

Visit `http://localhost:5000/health` to check if the server is running.
