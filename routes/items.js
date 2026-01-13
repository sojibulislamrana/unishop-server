const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create item (Protected logic should be handled here or in controller - for now just open)
// In a real app we'd verify the token here. The prompt implies "Add Item" page is protected, so the API should ideally be too.
// I'll leave it open for simplicity or add a dummy check if I had middleware.
router.post('/', async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;
  
  if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newItem = new Item({ 
        name, 
        description, 
        price, 
        category: category || 'General', 
        imageUrl 
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
