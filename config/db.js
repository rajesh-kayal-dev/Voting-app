const mongoose = require('mongoose');

// Load .env only in development (not in Render)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//const mongoURL = process.env.MONGODB_URL;
const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
  console.error('❌ MongoDB URL not found in environment variables');
  process.exit(1); // Exit if undefined
}

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Mongoose connection error:', err));

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

module.exports = db;
