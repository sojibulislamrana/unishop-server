const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unishop')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedItems = [
  {
    name: "Premium Wireless Headphones",
    description: "Experience high-fidelity audio with our premium wireless headphones. Noise-cancelling technology and 30-hour battery life.",
    price: 299.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
  },
  {
    name: "Minimalist Watch",
    description: "A sleek and modern timepiece. Genuine leather strap, water-resistant, and sapphire crystal glass.",
    price: 149.50,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
  },
  {
    name: "Ergonomic Office Chair",
    description: "Designed for comfort and productivity. Adjustable lumbar support, breathable mesh back, and smooth-rolling casters.",
    price: 499.00,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80"
  },
  {
    name: "Smart Fitness Tracker",
    description: "Track your health metrics with precision. Heart rate monitoring, sleep tracking, and GPS built-in.",
    price: 99.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"
  },
  {
    name: "Leather Messenger Bag",
    description: "Handcrafted from full-grain leather. Spacious compartments for your laptop and documents.",
    price: 199.00,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
  },
  {
    name: "Ceramic Coffee Set",
    description: "Artisan-crafted ceramic coffee set including a pot and four cups. Perfect for your morning brew.",
    price: 75.00,
    category: "Home",
    imageUrl: "https://images.unsplash.com/photo-1578749556935-ef887c46bde5?w=800&q=80"
  }
];

const seedDB = async () => {
  await Item.deleteMany({});
  await Item.insertMany(seedItems);
  console.log('Database Seeded!');
  mongoose.connection.close();
};

seedDB();
