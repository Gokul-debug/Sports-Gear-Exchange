import express from 'express';
import { User } from '../models/User.js';
import { Item } from '../models/Item.js';

const router = express.Router();

// User routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Item routes
router.get('/items', async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice } = req.query;
    let query = {};
    
    if (category && category !== 'all') query.category = category;
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    const items = await Item.find(query)
      .populate('sellerId', 'name avatar rating')
      .sort({ createdAt: -1 });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('sellerId', 'name avatar rating totalTrades');
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Increment view count
    item.views += 1;
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search route
router.get('/search', async (req, res) => {
  try {
    const { q, category, condition } = req.query;
    let query = {};
    
    if (q) {
      query.$text = { $search: q };
    }
    
    if (category && category !== 'all') query.category = category;
    if (condition) query.condition = condition;
    
    const items = await Item.find(query)
      .populate('sellerId', 'name avatar rating')
      .sort({ score: { $meta: 'textScore' } });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;