// routes/movieRoutes.js

const express = require('express');
const Movie = require('./models/Movie');
const Booking = require('../models/Booking');
const authenticateUser = require('../middleware/authenticateUser'); // Assuming you have an authentication middleware
const QRCode = require('qrcode'); // Import QRCode package

const router = express.Router();

// Route for booking seats and generating QR code
router.post('/book-seats', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId, selectedSeats } = req.body; // selectedSeats is an array of [row, col]

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if selected seats are available
    for (const [row, col] of selectedSeats) {
      if (!movie.seatLayout[row][col]) {
        return res.status(400).json({ message: `Seat at row ${row + 1}, col ${col + 1} is already booked.` });
      }
    }

    // Update seat layout to mark the selected seats as booked
    selectedSeats.forEach(([row, col]) => {
      movie.seatLayout[row][col] = false; // Mark seat as booked
    });

    // Calculate total price
    const totalPrice = selectedSeats.length * movie.ticketPrice;

    // Create a new booking
    const newBooking = new Booking({
      user: userId,
      movie: movieId,
      numberOfTickets: selectedSeats.length,
      totalPrice,
      selectedSeats,
      status: 'Confirmed'
    });

    // Save the booking
    await newBooking.save();

    // Generate QR code for booking
    const qrData = JSON.stringify({
      bookingId: newBooking._id,
      movieTitle: movie.title,
      seats: selectedSeats,
      totalPrice: newBooking.totalPrice,
      status: newBooking.status
    });

    QRCode.toDataURL(qrData, (err, url) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to generate QR code', error: err.message });
      }

      // Update the booking with the QR code URL
      newBooking.qrCode = url;
      newBooking.save();

      // Update movie's available seats count
      movie.availableSeats -= selectedSeats.length;
      movie.save();

      // Send the booking details including QR code URL
      res.status(201).json({
        message: 'Booking successful',
        booking: newBooking,
        qrCode: url
      });
    });
  } catch (err) {
    console.error('Error booking seats:', err);
    res.status(500).json({ message: 'Failed to book seats', error: err.message });
  }
});

module.exports = router;
