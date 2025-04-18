import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import "./MoviesList.css";
import "../navbar/Navbar"
import Navbar from "../navbar/Navbar";


const MoviesList = () => {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies/all");
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Navigate to movie details page
  const viewDetails = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    
    <div className="movies-list-container">
<Navbar/>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Movies List
      </motion.h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              className="movie-card"
              initial={{ opacity: 0, x: -200, scale: 0.8 }} // Slide from the left
              animate={{ opacity: 1, x: 0, scale: 1 }} // Move to its original position
              transition={{
                delay: 0.2 * index, // Staggered effect
                duration: 0.8,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.img
                src={movie.posterUrl}
                alt={movie.title}
                className="poster-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {movie.title}
              </motion.h3>
              <motion.button
                onClick={() => viewDetails(movie._id)}
                className="view-details-button"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#45a049",
                  color: "white",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
