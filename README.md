# UniShop Server

The backend API for the UniShop e-commerce application, built with Express.js and MongoDB.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Utilities**: dotenv, cors

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on port 27017)

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory (or use default mock values):
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/unishop
   ```

### Running the Server

- **Development Mode** (requires `nodemon`, installed via `npm install`):
  ```bash
  npm run dev
  ```
- **Production URL**: `http://localhost:5001` or `http://127.0.0.1:5001`

### Database Seeding
To populate the database with initial products:
```bash
npm run seed
# Ensure MongoDB is running before executing
```

## 📡 API Endpoints

### Items
- **GET** `/api/items` - Fetch all items
- **GET** `/api/items/:id` - Fetch single item details
- **POST** `/api/items` - Add a new item (Requires JSON body)

## 📂 Project Structure
- `models/` - Mongoose schemas (e.g., `Item.js`)
- `routes/` - Express route handlers
- `index.js` - Server entry point
