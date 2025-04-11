// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  numberOfTickets: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled', 'Confirmed'], // Ensure 'Paid' is included
    required: true,
  },  selectedSeats: { type: [[Number]], required: true }, // Store row and column as an array of arrays
  qrCode: { type: String }, // QR code data (URL or base64 image)
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
// module.exports = Booking;


// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
//   numberOfTickets: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   status: { type: String, enum: ['Pending', 'Confirmed'], default: 'Pending' },
//   selectedSeats: { type: [[Number]], required: true }, // Store row and column as an array of arrays
//   qrCode: { type: String }, // QR code data (URL or base64 image)
//   date: { type: Date, default: Date.now }, // Booking date
//   showTime: { 
//     type: String, 
//     enum: ['10am', '4pm', '8pm'], 
//     required: true // Ensure the user selects a timing
//   },
//   showDate: { 
//     type: Date, 
//     required: true, 
//     validate: {
//       validator: function (value) {
//         const today = new Date();
//         const maxDate = new Date();
//         maxDate.setDate(today.getDate() + 10); // 10 days from today
//         return value >= today && value <= maxDate; // Ensure date is within the next 10 days
//       },
//       message: 'Show date must be within the next 10 days.'
//     }
//   }
// });

// const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
