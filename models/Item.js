const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: false },
  imageUrl: { type: String, required: true }, // URL to image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);
