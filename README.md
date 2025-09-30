# 💰 Net - Personal Finance Tracker

A modern, full-stack mobile application for tracking personal finances with a clean interface and robust backend infrastructure.

![React Native](https://img.shields.io/badge/React%20Native-0.75-61DAFB?style=flat&logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?style=flat&logo=expo)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?style=flat&logo=redis)

## 🌟 Features

### 📱 Mobile App (React Native + Expo)
- **User Authentication** - Secure sign-up/sign-in with Clerk authentication
- **Transaction Management** - Create, view, and delete financial transactions
- **Financial Categories** - Organize transactions by income, expense, and investment types
- **Real-time Dashboard** - View transaction summaries and financial overview
- **Responsive Design** - Optimized for both iOS and Android devices
- **Keyboard UX** - Enhanced input experience with dismissible keyboard

### 🔧 Backend API (Node.js + Express)
- **RESTful API** - Clean, organized endpoints for all operations
- **Rate Limiting** - Upstash Redis-based protection against API abuse
- **Database Integration** - PostgreSQL with Neon serverless database
- **CORS Support** - Cross-origin resource sharing for mobile app
- **Error Handling** - Comprehensive error responses and logging

## 🏗️ Architecture

```
Net/
├── 📱 mobile/          # React Native Expo app
│   ├── app/           # App router screens
│   │   ├── (auth)/    # Authentication screens
│   │   └── (root)/    # Main app screens
│   ├── assets/        # Images, styles, fonts
│   ├── components/    # Reusable UI components
│   └── constants/     # App configuration
└── 🔧 backend/        # Node.js Express API
    └── src/
        ├── config/    # Database configuration
        ├── controllers/ # Business logic
        ├── middleware/  # Rate limiting, auth
        └── routes/    # API endpoints
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Git

### 1. Clone Repository
```bash
git clone https://github.com/kab1rs1dhu/Net.git
cd Net
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
PORT=5001
```

Start the backend server:
```bash
npm run dev     # Development mode
npm start       # Production mode
```

### 3. Mobile App Setup
```bash
cd mobile
npm install
```

Create `.env` file in mobile directory:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the Expo development server:
```bash
npx expo start
```

## 📊 API Endpoints

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/transactions/:userId` | Get all transactions for a user |
| `POST` | `/api/transactions` | Create a new transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction by ID |
| `GET` | `/api/transactions/summary/:userId` | Get financial summary for a user |

### Request/Response Examples

#### Create Transaction
```javascript
POST /api/transactions
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": -85.50,
  "category": "expense",
  "user_id": "user_123"
}
```

#### Get Transactions
```javascript
GET /api/transactions/user_123

Response:
{
  "transactions": [
    {
      "id": 1,
      "title": "Grocery Shopping",
      "amount": -85.50,
      "category": "expense",
      "user_id": "user_123",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 🎨 Mobile App Screens

### Authentication Flow
- **Sign In** - Email/password authentication with Clerk
- **Sign Up** - Account creation with email verification
- **Password Recovery** - Secure password reset flow

### Main Application
- **Dashboard** (`index.jsx`) - Financial overview and recent transactions
- **Create Transaction** (`create.jsx`) - Add new income/expense/investment
- **Transaction History** - View and manage all transactions

### Key Features
- **Keyboard Optimization** - Floating "Done" button for easy keyboard dismissal
- **Error Handling** - User-friendly error messages for all operations
- **Loading States** - Smooth UX with appropriate loading indicators
- **Navigation** - Intuitive tab-based navigation with Expo Router

## 🛠️ Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **Expo Router** - File-based routing system
- **Clerk** - Authentication and user management
- **KeyboardAwareScrollView** - Enhanced keyboard handling
- **Vector Icons** - Beautiful iconography

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Neon Database** - Serverless PostgreSQL
- **Upstash Redis** - Rate limiting and caching
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Render** - Backend hosting platform
- **Expo Go** - Mobile app testing
- **Git** - Version control
- **Environment Variables** - Secure configuration

## 📱 Mobile App Features in Detail

### Transaction Management
- **Create Transactions** - Add income, expenses, and investments
- **Category System** - Organize transactions by type
- **Real-time Updates** - Instant synchronization with backend
- **Delete Functionality** - Remove unwanted transactions

### User Experience
- **Authentication** - Secure Clerk-based auth system
- **Responsive Design** - Works on all screen sizes
- **Error Handling** - Clear feedback for all operations
- **Offline Graceful** - Handles network issues gracefully

### Security Features
- **Rate Limiting** - API protection against abuse
- **Authentication Required** - All operations require valid user session
- **Input Validation** - Client and server-side validation
- **Environment Variables** - Secure API key management

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Nodemon for auto-restart
```

### Mobile Development
```bash
cd mobile
npx expo start
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web version
```

### Database Schema
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds on push

### Mobile App
1. Build with Expo Application Services (EAS)
2. Submit to App Store/Google Play
3. Or distribute via Expo Go for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Kabir Singh Sidhu**
- GitHub: [@kab1rs1dhu](https://github.com/kab1rs1dhu)
- Email : sidhukabir55@gmail.com

## Acknowledgments

- **Clerk** for authentication services
- **Neon** for serverless PostgreSQL
- **Upstash** for Redis infrastructure
- **Expo** for amazing development experience
- **Render** for seamless deployment

---


