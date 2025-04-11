const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const Movie = require('../models/movie');
const Booking = require('../models/bookings');
// const pdf = require('pdfkit'); // For generating PDFs
// const nodemailer = require('nodemailer'); // For sending emails
// const  generatePDFReceipt = require('../utils/pdfGenerator')

router.post('/bookticket', async (req, res) => {
    const { userId, movieId, selectedSeats } = req.body;

    // Validate input
    if (!userId || !movieId || !selectedSeats || !Array.isArray(selectedSeats)) {
        return res.status(400).json({ message: "Invalid input. Please provide valid userId, movieId, and selectedSeats." });
    }

    // Check if userId and movieId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: "Invalid movieId format" });
    }

    try {
        // Find user and movie by their ObjectIds
        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);

        if (!user || !movie) {
            return res.status(404).json({ message: "User or Movie not found" });
        }

        console.log('Movie Seat Layout:', movie.seatLayout);

        // Check seat availability
        const unavailableSeats = selectedSeats.filter(([row, col]) => !movie.seatLayout[row][col]);
        if (unavailableSeats.length > 0) {
            console.log('Unavailable Seats:', unavailableSeats);
            return res.status(400).json({ 
                message: "Some seats are already booked", 
                unavailableSeats 
            });
        }

        // Calculate total price
        const totalPrice = selectedSeats.length * movie.ticketPrice;

        // Mark seats as booked in the movie's seat layout
        selectedSeats.forEach(([row, col]) => {
            movie.seatLayout[row][col] = false;
        });

        // Reduce the number of available seats after booking
        movie.availableSeats -= selectedSeats.length; // Update available seats count
        console.log('Updated Available Seats:', movie.availableSeats);

        // Save the updated movie
        try {
            await movie.save();
        } catch (error) {
            console.error('Error saving movie:', error);
            return res.status(500).json({ message: "Failed to update movie seat layout" });
        }

        // Create booking record
        const booking = new Booking({
            user: userId, 
            movie: movieId,
            numberOfTickets: selectedSeats.length,
            totalPrice,
            selectedSeats,
            status: "Confirmed",
        });

        // Save the booking
        try {
            const savedBooking = await booking.save();
            res.status(201).json({
                message: "Proceeding to pay",
                booking: savedBooking,
            });
        } catch (error) {
            console.error('Error saving booking:', error);
            return res.status(500).json({ message: "Failed to save booking" });
        }
    } catch (error) {
        console.error("Error handling booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.post('/bookticket', async (req, res) => {
//     const { userId, movieId, selectedSeats } = req.body;

//     // Validate input
//     if (!userId || !movieId || !selectedSeats || !Array.isArray(selectedSeats)) {
//         return res.status(400).json({ message: "Invalid input. Please provide valid userId, movieId, and selectedSeats." });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(movieId)) {
//         return res.status(400).json({ message: "Invalid userId or movieId format" });
//     }

//     try {
//         // Fetch user and movie details
//         const user = await User.findById(userId);
//         const movie = await Movie.findById(movieId);

//         if (!user || !movie) {
//             return res.status(404).json({ message: "User or Movie not found" });
//         }

//         // Validate seat indices
//         const rows = movie.seatLayout.length;
//         const cols = movie.seatLayout[0]?.length || 0;
//         const invalidSeats = selectedSeats.filter(([row, col]) => row < 0 || col < 0 || row >= rows || col >= cols);

//         if (invalidSeats.length > 0) {
//             return res.status(400).json({ 
//                 message: "Invalid seat indices", 
//                 invalidSeats 
//             });
//         }

//         // Check seat availability
//         const unavailableSeats = selectedSeats.filter(([row, col]) => !movie.seatLayout[row][col]);
//         if (unavailableSeats.length > 0) {
//             return res.status(400).json({ 
//                 message: "Some seats are already booked", 
//                 unavailableSeats 
//             });
//         }

//         // Calculate total price
//         const totalPrice = selectedSeats.length * movie.ticketPrice;

//         // Update seat layout and available seats
//         selectedSeats.forEach(([row, col]) => {
//             movie.seatLayout[row][col] = false;
//         });
//         movie.availableSeats -= selectedSeats.length;

//         // Save updated movie data
//         await movie.save();

//         // Create booking record
//         const booking = new Booking({
//             user: userId, 
//             movie: movieId,
//             numberOfTickets: selectedSeats.length,
//             totalPrice,
//             selectedSeats,
//             status: "Confirmed",
//         });

//         const savedBooking = await booking.save();

//         // Generate PDF receipt
//         const pdfBuffer = await generatePDFReceipt({
//             user,
//             movie,
//             booking: savedBooking,
//         });

//         // Send email with PDF receipt
//         await sendEmail({
//             email: user.email,
//             subject: "Booking Confirmation",
//             pdfBuffer,
//         });

//         res.status(201).json({
//             message: "Booking successful. Confirmation email sent.",
//             booking: savedBooking,
//         });
//     } catch (error) {
//         console.error("Error handling booking:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// GET /api/bookings - Fetch all bookings
router.get('/bookingconfirm', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('movie').populate('user');
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });


  
// Add the route here
// GET Booking by ID to fetch total price
// router.get('/:id', async (req, res) => {
//   try {
//     // Validate the provided ID
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: 'Invalid booking ID' });
//     }

//     // Find the booking by ID
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Send the totalPrice
//     res.status(200).json({ totalPrice: booking.totalPrice });
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ totalPrice: booking.totalPrice });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



  router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const bookings = await Booking.find({ user: userId }).populate("movie");
      const sanitizedBookings = bookings.map((booking) => {
        if (!booking.movie) {
          booking.movie = { title: "Unknown Movie" }; // Default title for missing movie
        }
        return booking;
      });
  
      if (sanitizedBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user." });
      }
  
      res.json(sanitizedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings." });
    }
  });
  
  

module.exports = router;
