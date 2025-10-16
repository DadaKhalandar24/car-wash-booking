// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/bookings', require('./routes/bookings'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     success: false, 
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'production' ? {} : err 
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: 'Route not found' 
//   });
// });

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carwash')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use('/api/bookings', require('./routes/bookings'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carwash';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the backend: http://localhost:${PORT}/api/test`);
});