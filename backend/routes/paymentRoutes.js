const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Import Mongoose
const Booking = require("../models/bookings"); // Import your Booking model

// Simulate payment
router.post("/payment", async (req, res) => {
  const { cardNumber, expiryDate, cvv, name, bookingId } = req.body;

  // Validate input
  if (!cardNumber || !expiryDate || !cvv || !name || !bookingId) {
    return res.status(400).json({ message: "Invalid input. Please fill all fields." });
  }

  try {
    // Validate the booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID format." });
    }

    // Fetch the booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Simulate payment success/failure
    const isPaymentSuccessful = true; // Force success for debugging
    if (isPaymentSuccessful) {
      // Update the booking status to 'Paid'
      booking.status = "Paid";
      await booking.save();

      // Return success response
      return res.status(200).json({ 
        message: "Payment successful", 
        bookingId: booking._id, 
        status: booking.status 
      });
    } else {
      // Payment failure response
      return res.status(500).json({ message: "Payment failed. Please try again." });
    }
  } catch (error) {
    // Handle errors
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
