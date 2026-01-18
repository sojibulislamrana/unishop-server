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

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unishop', {
        serverSelectionTimeoutMS: 5000
      });
      isConnected = true;
      console.log('MongoDB Connected Successfully');
  } catch (err) {
      console.error('MongoDB Connection Error:', err.message);
      // Don't exit process in serverless, just throw or let middleware handle
  }
};

// Attempt initial connection (optional in serverless but good for local)
connectDB();

// Routes
const itemRoutes = require('./routes/items');

app.get('/', (req, res) => {
  res.send('UniShop API is running');
});

// Middleware to check DB connection
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
      try {
          await connectDB();
          if (mongoose.connection.readyState !== 1) {
               return res.status(503).json({ error: 'Database not connected' });
          }
      } catch (err) {
          return res.status(503).json({ error: 'Database connection failed' });
      }
  }
  next();
});

app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
