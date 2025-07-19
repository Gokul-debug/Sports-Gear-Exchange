import { connectToDatabase } from '../lib/mongodb';
import { User } from '../models/User';
import { Item } from '../models/Item';

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create sample users
    const users = await User.insertMany([
      {
        email: 'aakashmohan24@email.com',
        password: 'password123', // In real app, this should be hashed
        name: 'Aakash Mohan',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        location: 'Chennai, Tamil Nadu',
        rating: 4.8,
        totalTrades: 23
      },
      {
        email: 'sowmiya123@email.com',
        password: 'password123',
        name: 'Sowmiya',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        location: 'Coimbatore, Tamil Nadu',
        rating: 4.7,
        totalTrades: 15
      },
      {
        email: 'harish34@email.com',
        password: 'password123',
        name: 'Harish Kumar',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        location: 'Bangalore, Karnataka',
        rating: 4.8,
        totalTrades: 31
      },
       {
        email: 'Gokul24@email.com',
        password: 'password123',
        name: 'Gokul',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        location: 'Chennai, Tamil Nadu',
        rating: 4.8,
        totalTrades: 31
      }

    ]);

    // Create sample items
    await Item.insertMany([
      {
        title: 'Nike Air Jordan Basketball Shoes',
        description: 'These are authentic Nike Air Jordan basketball shoes in excellent condition. Only worn a few times for indoor games.',
        price: 9999,
        condition: 'like_new',
        category: 'Basketball',
        brand: 'Nike',
        size: '10.5',
        color: 'Black/Red',
        location: 'Mumbai, Maharashtra',
        images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[0]._id
      },
      {
        title: 'Wilson Tennis Racket Pro Series',
        description: 'Professional grade tennis racket in good condition. Perfect for intermediate to advanced players.',
        price: 7099,
        condition: 'good',
        category: 'Tennis',
        brand: 'Wilson',
        size: 'Standard',
        color: 'Black/Blue',
        location: 'Delhi, Delhi',
        images: ['https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[1]._id
      },
      {
        title: 'Adidas Soccer Cleats',
        description: 'Quality soccer cleats with good grip. Some wear but still functional.',
        price: 5399,
        condition: 'fair',
        category: 'Soccer',
        brand: 'Adidas',
        size: '9',
        color: 'White/Black',
        location: 'Bangalore, Karnataka',
        images: ['https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[2]._id
      },
      {
        title: 'Under Armour Running Shoes',
        description: 'Lightweight running shoes perfect for daily training.',
        price: 7899,
        condition: 'like_new',
        category: 'Running',
        brand: 'Under Armour',
        size: '8.5',
        color: 'Blue/White',
        location: 'Chennai, Tamil Nadu',
        images: ['https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[0]._id
      },
      {
        title: 'Spalding Basketball Official Size',
        description: 'Official size basketball in good condition.',
        price: 2899,
        condition: 'good',
        category: 'Basketball',
        brand: 'Spalding',
        color: 'Orange',
        location: 'Pune, Maharashtra',
        images: ['https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[1]._id
      },
      {
        title: 'Nike Golf Driver Club',
        description: 'Professional golf driver in excellent condition.',
        price: 12499,
        condition: 'like_new',
        category: 'Golf',
        brand: 'Nike',
        location: 'Hyderabad, Telangana',
        images: ['https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
        sellerId: users[2]._id
      }
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}