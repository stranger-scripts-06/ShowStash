import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { motion } from "framer-motion"; // Import motion for animations
import "./MovieDetails.css"; // Create the CSS file for styling
import Navbar from "../navbar/Navbar";



const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null); // State for storing movie data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(response.data); // Set fetched movie data to state
        setLoading(false); // Stop loading
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
        setLoading(false); // Stop loading even on error
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>{error}</p>;

  // Render when no movie data is found
  if (!movie) return <p>No movie found.</p>;

  // Handle Book Tickets Button
  const handleBookTickets = () => {
    navigate(`/bookticket/${id}`); // Use navigate to go to the booking page for this movie
  };

  return (
    
    <motion.div
      className="movie1-details-container"
      
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
{/* Animate the movie title with Framer Motion */}
<Navbar/>

<motion.h1
        initial={{ opacity: 0, y: -50 }}        // Start off-screen, invisible
        animate={{ opacity: 1, y: 0 }}           // Fade in and slide into place
        transition={{
          duration: 1,                          // Duration of the animation
          type: 'spring',                       // Spring-based easing for a bouncy effect
          stiffness: 120                        // Stiffness for the spring
        }}
        className="movie-title"                  // Your custom styling class
      >
        Movie Title
      </motion.h1>
      <div className="movie1-details-content">
        <div className="movie1-poster">
          {movie.posterUrl && (
            <motion.img
              src={movie.posterUrl}
              alt={`${movie.title} Poster`}
              className="poster-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          )}
        </div>

        <div className="movie1-info">
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Duration:</strong> {movie.duration} mins</p>
          <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p><strong>Ticket Price:</strong> ${movie.ticketPrice.toFixed(2)}</p>
          <p><strong>Total Seats:</strong> {movie.totalSeats}</p>
          <p><strong>Available Seats:</strong> {movie.availableSeats}</p>

          {/* Book Tickets Button */}
          <motion.button
            onClick={handleBookTickets}
            className="book-tickets-btn"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#FF5722",
              color: "white",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Book Tickets
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;
