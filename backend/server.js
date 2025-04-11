const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/movies');
const eventsRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/paymentRoutes');



// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/auth', authRoutes);
app.use('/movies', moviesRoutes);
app.use('/events', eventsRoutes);
app.use('/bookings', bookingRoutes);
app.use('/paymentRoutes', paymentRoutes);







// Serve uploaded images from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// MongoDB connection
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
