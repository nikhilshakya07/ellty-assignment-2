# Number Discussion App

A social media-like application where users communicate using numbers and mathematical operations instead of text. Users can post starting numbers and reply with mathematical operations, creating tree-like discussion threads.

## 🚀 Live Demo

- **Frontend**: [Your-Vercel-Link-Here]
- **Backend API**: [Your-Render-Link-Here]

## 📋 Project Overview

This application allows users to:

- View discussion trees without authentication
- Register and login with username/password
- Post starting numbers to begin discussions
- Reply to any number with mathematical operations (+, -, ×, ÷)
- Create nested calculation trees

### Example Discussion Tree:
```
Alex posts: 10
├── George replies: 10 + 5 = 15
│   └── Masha replies: 15 × 2 = 30
└── Julia replies: 10 ÷ 2 = 5
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with TypeScript
- **Express.js** for API framework
- **JWT** for authentication
- **bcrypt** for password hashing
- **In-memory storage** for data persistence
- **CORS** enabled for frontend communication

### Frontend
- **React** with TypeScript
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

### DevOps
- **Docker** & **Docker Compose** for containerization
- Separate containers for frontend and backend

## 📁 Project Structure

```
ellty-assignment-2/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── storage.ts          # In-memory data storage
│   │   ├── middleware/
│   │   │   └── auth.ts             # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.ts             # Register & login routes
│   │   │   ├── discussions.ts      # Discussion CRUD routes
│   │   │   └── operations.ts       # Operation routes
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   └── server.ts               # Express app entry point
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── DiscussionList.tsx
│   │   │   ├── DiscussionTree.tsx
│   │   │   ├── OperationNode.tsx   # Recursive tree component
│   │   │   ├── AddOperation.tsx
│   │   │   ├── CreateDiscussion.tsx    
│   │   │   └── Login.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/
│   │   │   └── api.ts              # Axios API service
│   │   └── types/
│   │       └── index.ts
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (for backend) and 20+ (for frontend)
- **Docker Desktop** installed and running
- **Git** installed

### Option 1: Run with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nikhilshakya07/ellty-assignment-2.git
   cd ellty-assignment-2
   ```

2. **Start with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/health

4. **Stop the application:**
   ```bash
   # Press Ctrl+C, then:
   docker-compose down
   ```

### Option 2: Run Locally (Without Docker)

#### Backend Setup:
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

#### Frontend Setup:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
SALT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Discussions
- `GET /api/discussions` - Get all discussions (public)
- `POST /api/discussions` - Create new discussion (authenticated)
- `GET /api/discussions/:id` - Get specific discussion

### Operations
- `POST /api/operations` - Add operation to discussion (authenticated)
- `GET /api/operations/discussion/:discussionId` - Get all operations for a discussion

## ✨ Features

### Implemented Requirements
- ✅ Unregistered users can view all discussion trees
- ✅ User registration with username/password
- ✅ User authentication with JWT
- ✅ Registered users can create starting numbers
- ✅ Registered users can add mathematical operations
- ✅ Recursive tree structure for nested operations
- ✅ Real-time calculation of results
- ✅ Component-based React architecture
- ✅ Docker Compose setup

### Technical Highlights
- **In-memory storage** for fast development and testing
- **JWT authentication** with secure token management
- **Recursive React components** for tree rendering
- **RESTful API design**
- **TypeScript** for type safety
- **Responsive design** with Tailwind CSS

## 🧪 Testing

### Test the Backend API:
```bash
cd backend
npm test
```

### Manual Testing:
1. Register a new user
2. Login with credentials
3. Create a discussion with starting number (e.g., 10)
4. Add operation: 10 + 5 = 15
5. Reply to result: 15 × 2 = 30
6. Verify tree structure displays correctly

## 🐳 Docker Commands

```bash
# Build and start containers
docker-compose up --build

# Start in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove all containers and images
docker-compose down --rmi all

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

## 🔧 Development

### Backend Development:
- Hot reload enabled with nodemon
- TypeScript compilation on the fly with ts-node
- Code changes reflect immediately

### Frontend Development:
- Hot module replacement with Vite
- Fast refresh for React components
- Instant updates on code changes

## 📝 Design Decisions

### Why In-Memory Storage?
- ✅ Fast development and testing
- ✅ No database setup required
- ✅ Perfect for demonstration purposes
- ✅ Easy to switch to persistent storage later
- ⚠️ **Note**: Data resets on server restart

### Why JWT Authentication?
- Stateless authentication
- Scalable for distributed systems
- Industry standard
- Easy to implement and secure

### Why Docker Compose?
- Consistent environment across all machines
- Easy setup for reviewers
- Production-ready deployment strategy
- Isolated services

## 🚀 Deployment

### Frontend (Vercel):
```bash
cd frontend
vercel --prod
```

### Backend (Render/Railway):
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 👤 Author

**Your Name**
- GitHub: https://github.com/nikhilshakya07
- Email: nikhilshakya1308@gmail.com

## 📄 License

This project was created as a test assignment for Ellty.

## 🙏 Acknowledgments

- Assignment provided by Anton Taskin, CEO - Ellty
- Built with modern web technologies and best practices
