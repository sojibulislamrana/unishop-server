const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://unshod-c.vercel.app',
        'https://unishop-server.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

// Database Connection
// Database Connection
const prompt = process.env.MONGODB_URI ? "Authenticating with User provided URI..." : "Using Local MongoDB...";
console.log(prompt);

// Database Connection (Cached Pattern for Serverless)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };
    
    // Log intent (don't log the full URI for security)
    console.log("Connecting to MongoDB..."); 

    cached.promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unishop', opts).then((mongoose) => {
      console.log('MongoDB Connected New Session');
      return mongoose;
    }).catch(err => {
        console.error('MongoDB Connection Init Error:', err);
        throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB Connection Await Error:', e);
    throw e;
  }

  return cached.conn;
}

// Routes
const itemRoutes = require('./routes/items');

app.get('/', (req, res) => {
  res.send('UniShop API is running');
});

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Middleware DB Connection Failed:", error);
        res.status(503).json({ error: 'Database connection failed', details: error.message });
    }
});

app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
