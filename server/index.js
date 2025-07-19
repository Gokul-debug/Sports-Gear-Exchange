import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/mongodb.js';
import { seedDatabase } from './seedData.js';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import { Item } from './models/Item.js'; // ✅ Use named import



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sports-gear-exchange.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase()
  .then(async () => {
    console.log('✅ Connected to MongoDB: ', mongoose.connection.name);
    
    // Seed database with sample data
    await seedDatabase();

    // Create the text index
    await Item.collection.createIndex({ title: 'text', description: 'text' });
    console.log('🔍 Text index on title and description created.');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sports Gear Trading API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use(/.*/, (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});