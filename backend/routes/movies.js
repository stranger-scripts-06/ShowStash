const express = require('express');
const Movie = require('../models/movie'); // Assuming you have a Movie model
const User = require("../models/users"); // Assuming you have a User model

const router = express.Router();



router.post('/add', async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      duration,
      releaseDate,
      ticketPrice,
      totalSeats,
      availableSeats,
      rows,
      columns,
      posterUrl
    } = req.body;

    // Validate all required fields
    if (
      !title ||
      !description ||
      !genre ||
      !duration ||
      !releaseDate ||
      !ticketPrice ||
      !totalSeats ||
      !availableSeats ||
      !rows ||
      !columns ||
      !posterUrl
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const totalSeatsNum = parseInt(totalSeats, 10);
    const rowsNum = parseInt(rows, 10);
    const columnsNum = parseInt(columns, 10);

    if (totalSeatsNum > rowsNum * columnsNum) {
      return res.status(400).json({ message: 'Total seats cannot exceed rows * columns' });
    }

    // Generate seat layout
    const seatLayout = Array.from({ length: rowsNum }, (_, rowIndex) =>
      Array.from(
        { length: columnsNum },
        (_, colIndex) => rowIndex * columnsNum + colIndex < totalSeatsNum
      )
    );

    // Create new Movie document
    const newMovie = new Movie({
      title,
      description,
      genre,
      duration,
      releaseDate,
      ticketPrice,
      totalSeats: totalSeatsNum,
      availableSeats,
      rows,
      columns,
      posterUrl,
      seatLayout
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
  } catch (err) {
    console.error('Error saving movie:', err);
    res.status(500).json({ message: 'Error saving movie', error: err.message });
  }
});





// Route to get all movies
router.get('/all', async (req, res) => {
    try {
      // Fetch all movies from the database
      const movies = await Movie.find();
      
      // If no movies are found, return an empty array
      if (movies.length === 0) {
        return res.status(200).json({ message: 'No movies found', movies: [] });
      }
  
      // Return the list of movies
      res.status(200).json(movies);
    } catch (error) {
      // Handle errors and send a response
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Failed to fetch movies', error });
    }
  });

// GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Find movie by ID
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" }); // If no movie found
    }
    res.json(movie); // Send movie details as response
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ message: "Server error" }); // Server error
  }
});





module.exports = router;
