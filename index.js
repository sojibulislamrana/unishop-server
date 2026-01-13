const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const prompt = process.env.MONGODB_URI ? "Authenticating with User provided URI..." : "Using Local MongoDB...";
console.log(prompt);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unishop', {
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
      console.error('MongoDB Connection Error:', err.message);
      console.error('Check your .env file or ensure MongoDB is running.');
  });

// Routes
const itemRoutes = require('./routes/items');

app.get('/', (req, res) => {
  res.send('UniShop API is running');
});

// Middleware to check DB connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database not connected' });
  }
  next();
});

app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
