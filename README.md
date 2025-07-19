# Sports Gear Trading Platform

A modern web application for buying, selling, and trading sports equipment built with React, TypeScript, and MongoDB.

## Features

- 🏀 **Marketplace**: Browse and search sports equipment
- 🛒 **Shopping Cart**: Add items to cart and manage purchases
- 👤 **User Profiles**: Manage your profile and view trading history
- 💬 **Real-time Chat**: Communicate with buyers and sellers
- 🔒 **Secure Authentication**: User registration and login
- 📱 **Responsive Design**: Works on all devices
- 💰 **Indian Rupee Support**: Prices in INR with proper formatting

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Icons**: Lucide React
- **Build Tool**: Vite

## Database Schema

The application uses MongoDB with the following collections:

- `users` - User profiles and authentication
- `items` - Sports equipment listings
- `cartitems` - Shopping cart functionality
- `trades` - Trade history and status
- `messages` - User communication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sports-gear-trading-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/sports-gear-trading`

   **Option B: MongoDB Atlas (Cloud)**
   - Create account at [mongodb.com](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace `<username>`, `<password>`, and `<cluster>` in the connection string

4. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/sports-gear-trading
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sports-gear-trading
   
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── lib/               # Configuration and utilities
├── models/            # MongoDB/Mongoose models
├── pages/             # Page components
├── services/          # Database service functions
├── utils/             # Utility functions and seed data
└── types/             # TypeScript type definitions

server/
└── index.js           # Express server (optional)
```

## MongoDB Models

### User Model
- Email, password, name, avatar
- Location, phone, rating
- Total trades count
- Timestamps

### Item Model
- Title, description, price
- Condition, category, brand
- Size, color, location
- Images array, seller reference
- Status, views, interested count
- Timestamps

### CartItem Model
- User reference, item reference
- Quantity
- Timestamps

### Trade Model
- Item, buyer, seller references
- Status, offer price, message
- Timestamps

### Message Model
- Sender, receiver references
- Item reference (optional)
- Content, read status
- Timestamps

## Key Features

### Database Integration
- MongoDB with Mongoose ODM
- Proper indexing for performance
- Data validation and relationships
- Sample data seeding

### Authentication
- JWT-based authentication
- Password hashing (to be implemented)
- User profile management
- Protected routes

### Marketplace
- Browse items by category
- Search and filter functionality
- Grid and list view modes
- Add to cart functionality

### User Dashboard
- View your listings
- Manage trade history
- Update profile settings

## Development

### Seeding Sample Data
The application automatically seeds sample data on first run. To manually seed:

```bash
# The seedDatabase function runs automatically when the server starts
# Sample users and items will be created if the database is empty
```

### Database Operations
All database operations are handled through service functions in `src/services/database.ts`:

- `userService` - User CRUD operations
- `itemService` - Item management
- `cartService` - Shopping cart operations
- `tradeService` - Trade management
- `messageService` - Messaging system

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy with MongoDB Atlas
1. Set up MongoDB Atlas cluster
2. Update environment variables
3. Deploy to your preferred hosting platform
4. Ensure MongoDB Atlas allows connections from your hosting provider

## Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sports-gear-trading

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# App Configuration
NODE_ENV=development
PORT=3001
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or create an issue in the repository.

## MongoDB Setup Guide

### Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from mongodb.com
2. Install and start MongoDB service
3. Use connection string: `mongodb://localhost:27017/sports-gear-trading`

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Linux (Ubuntu):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### MongoDB Atlas (Cloud) Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Add your IP address to the whitelist
6. Get your connection string
7. Replace placeholders with your credentials

Your connection string will look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sports-gear-trading?retryWrites=true&w=majority
```