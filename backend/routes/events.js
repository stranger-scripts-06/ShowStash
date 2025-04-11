const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Event add route with detailed error logging
router.post('/add', async (req, res) => {
  try {
    // Extract event details from request body
    const {
      title,
      description,
      genre,
      duration,
      releaseDate,
      ticketPrice,
      totalSeats,
      availableSeats,
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
      !posterUrl
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new Event document
    const newEvent = new Event({
      title,
      description,
      genre,
      duration: Number(duration),
      releaseDate: new Date(releaseDate),
      ticketPrice: Number(ticketPrice),
      totalSeats: Number(totalSeats),
      availableSeats: Number(availableSeats),
      posterUrl
    });
    

    // Save the event to the database
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (err) {
    console.error('Error saving event:', err.message);
    console.error('Error stack:', err.stack); // Add stack trace logging
    res.status(500).json({ message: 'Failed to add event', error: err.message });
  }
});


// Route to get all movies
router.get('/all', async (req, res) => {
  try {
    // Fetch all movies from the database
    const events = await Event.find();
    
    // If no movies are found, return an empty array
    if (events.length === 0) {
      return res.status(200).json({ message: 'No events found', events: [] });
    }

    // Return the list of movies
    res.status(200).json(events);
  } catch (error) {
    // Handle errors and send a response
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});


module.exports = router;