# Complete Testing Guide for Number Discussion API

## 1. Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Server configuration
PORT=5000
NODE_ENV=development

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

## 2. Start the Server

```bash
cd backend
npm install
npm run dev
```

The server will start on `http://localhost:5000`

## 3. Postman Testing Guide

### Step 1: Health Check
- **Method**: GET
- **URL**: `http://localhost:5000/health`
- **Expected Response**: 
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Number Discussion API"
}
```

### Step 2: Register a User
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "alex",
  "password": "password123"
}
```
- **Expected Response**:
```json
{
  "message": "User created successfully",
  "userId": "generated-user-id"
}
```

### Step 3: Login
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "alex",
  "password": "password123"
}
```
- **Expected Response**:
```json
{
  "token": "jwt-token-here",
  "userId": "user-id",
  "username": "alex"
}
```
- **Save the token** for authenticated requests!

### Step 4: Create a Discussion
- **Method**: POST
- **URL**: `http://localhost:5000/api/discussions`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Body** (raw JSON):
```json
{
  "startingNumber": 10
}
```
- **Expected Response**:
```json
{
  "id": "discussion-id",
  "startingNumber": 10,
  "createdBy": "user-id",
  "createdByUsername": "alex",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```
- **Save the discussion ID** for operations!

### Step 5: Add First Operation (Reply to Starting Number)
- **Method**: POST
- **URL**: `http://localhost:5000/api/operations`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Body** (raw JSON):
```json
{
  "discussionId": "DISCUSSION_ID_FROM_STEP_4",
  "parentId": null,
  "operationType": "add",
  "rightNumber": 5
}
```
- **Expected Response**:
```json
{
  "id": "operation-id",
  "discussionId": "discussion-id",
  "parentId": null,
  "operationType": "add",
  "rightNumber": 5,
  "result": 15,
  "createdBy": "user-id",
  "createdByUsername": "alex",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Step 6: Add Second Operation (Reply to First Operation)
- **Method**: POST
- **URL**: `http://localhost:5000/api/operations`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Body** (raw JSON):
```json
{
  "discussionId": "DISCUSSION_ID_FROM_STEP_4",
  "parentId": "OPERATION_ID_FROM_STEP_5",
  "operationType": "multiply",
  "rightNumber": 2
}
```
- **Expected Response**:
```json
{
  "id": "operation-id-2",
  "discussionId": "discussion-id",
  "parentId": "operation-id",
  "operationType": "multiply",
  "rightNumber": 2,
  "result": 30,
  "createdBy": "user-id",
  "createdByUsername": "alex",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Step 7: Get All Discussions (See Tree Structure)
- **Method**: GET
- **URL**: `http://localhost:5000/api/discussions`
- **No authentication required**
- **Expected Response**:
```json
[
  {
    "id": "discussion-id",
    "startingNumber": 10,
    "createdBy": "user-id",
    "createdByUsername": "alex",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "operations": [
      {
        "id": "operation-id",
        "discussionId": "discussion-id",
        "parentId": null,
        "operationType": "add",
        "rightNumber": 5,
        "result": 15,
        "createdBy": "user-id",
        "createdByUsername": "alex",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "children": [
          {
            "id": "operation-id-2",
            "discussionId": "discussion-id",
            "parentId": "operation-id",
            "operationType": "multiply",
            "rightNumber": 2,
            "result": 30,
            "createdBy": "user-id",
            "createdByUsername": "alex",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "children": []
          }
        ]
      }
    ]
  }
]
```

## 4. cURL Commands for Testing

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "alex", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alex", "password": "password123"}'
```

### Create Discussion
```bash
curl -X POST http://localhost:5000/api/discussions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"startingNumber": 10}'
```

### Add Operation
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

### Get All Discussions
```bash
curl -X GET http://localhost:5000/api/discussions
```

## 5. JWT Authentication Testing

### Test Valid Token
```bash
curl -X GET http://localhost:5000/api/discussions \
  -H "Authorization: Bearer YOUR_VALID_JWT_TOKEN"
```

### Test Invalid Token
```bash
curl -X GET http://localhost:5000/api/discussions \
  -H "Authorization: Bearer invalid-token"
```

### Test Missing Token (Should Fail)
```bash
curl -X POST http://localhost:5000/api/discussions \
  -H "Content-Type: application/json" \
  -d '{"startingNumber": 10}'
```

## 6. Error Testing

### Test Invalid Operation Type
```bash
curl -X POST http://localhost:5000/api/operations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "discussionId": "DISCUSSION_ID",
    "parentId": null,
    "operationType": "invalid",
    "rightNumber": 5
  }'
```

### Test Division by Zero
```bash
curl -X POST http://localhost:5000/api/operations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "discussionId": "DISCUSSION_ID",
    "parentId": null,
    "operationType": "divide",
    "rightNumber": 0
  }'
```

## 7. Complete Test Scenario

Follow this exact sequence to test the tree structure:

1. **Register user "alex"**
2. **Login and get JWT token**
3. **Create discussion with starting number 10**
4. **Add operation: 10 + 5 = 15** (parentId: null)
5. **Add operation: 15 × 2 = 30** (parentId: operation from step 4)
6. **Add operation: 10 ÷ 2 = 5** (parentId: null, parallel to step 4)
7. **Get all discussions** to see the tree structure

The final tree should look like:
```
10 (starting number)
├── 10 + 5 = 15
│   └── 15 × 2 = 30
└── 10 ÷ 2 = 5
```

## 8. Postman Collection Import

You can create a Postman collection with these requests:

1. **Health Check** - GET `/health`
2. **Register** - POST `/api/auth/register`
3. **Login** - POST `/api/auth/login`
4. **Create Discussion** - POST `/api/discussions`
5. **Add Operation** - POST `/api/operations`
6. **Get Discussions** - GET `/api/discussions`
7. **Get Discussion by ID** - GET `/api/discussions/:id`

Set up environment variables in Postman:
- `baseUrl`: `http://localhost:5000`
- `jwtToken`: (set after login)
- `discussionId`: (set after creating discussion)
- `operationId`: (set after creating operation)
