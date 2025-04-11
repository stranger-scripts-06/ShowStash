// const mongoose = require("mongoose");

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   genre: { type: String, required: true },
//   duration: { type: Number, required: true },
//   releaseDate: { type: Date, required: true },
//   ticketPrice: { type: Number, required: true },
//   totalSeats: { type: Number, required: true },
//   availableSeats: { type: Number, required: true },
//   seatLayout: {
//     type: [[Boolean]], // 2D array for seat availability
//     required: true,
//     default: function () {
//       // Dynamically create a seat layout based on totalSeats
//       return Array(this.totalSeats)
//         .fill()
//         .map(() => Array(this.totalSeats).fill(true)); // Default to all seats available
//     },
//   },
//   posterUrl: { type: String, required: true },
//   bookedTickets: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
//       seats: [[Number]], // 2D array of seat indices [row, col]
//     },
//   ],
// });

// const Movie = mongoose.model("Movie", movieSchema);
// module.exports = Movie;


// models/Movie.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  ticketPrice: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  rows: { type: Number, required: true }, // Number of rows in the seating layout
  columns: { type: Number, required: true }, // Number of columns in the seating layout
  seatLayout: {
    type: [[Boolean]], // 2D array representing seat availability
    required: true,
    default: [], // Will be dynamically generated
  },
  posterUrl: { type: String, required: true },
});

// Model creation
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;



// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   genre: { type: String, required: true },
//   duration: { type: Number, required: true },
//   releaseDate: { type: Date, required: true },
//   ticketPrice: { type: Number, required: true },
//   totalSeats: { type: Number, required: true },
//   availableSeats: { type: Number, required: true },
//   seatLayout: {
//     type: [[Boolean]], // 2D array for seat availability
//     required: true,
//     default: Array(10)
//       .fill()
//       .map(() => Array(10).fill(true)), // 5x5 grid with all seats available
//   },
  
//   posterUrl: { type: String, required: true },
// });

// const Movie = mongoose.model('Movie', movieSchema);
// module.exports = Movie;

// const mongoose = require("mongoose");

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   genre: { type: String, required: true },
//   duration: { type: Number, required: true },
//   releaseDate: { type: Date, required: true },
//   ticketPrice: { type: Number, required: true },
//   totalSeats: { type: Number, required: true },
//   availableSeats: { type: Number, required: true },
//   seatLayout: {
//     type: [[Boolean]], // 2D array for seat availability
//     required: true,
//     default: Array(totalSeats)
//       .fill()
//       .map(() => Array(totalSeats).fill(true)), 
//   },
//   posterUrl: { type: String, required: true },
//   bookedTickets: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
//       seats: [[Number]], // 2D array of seat indices [row, col]
//     },
//   ],
// });

// const Movie = mongoose.model("Movie", movieSchema);
// module.exports = Movie;

