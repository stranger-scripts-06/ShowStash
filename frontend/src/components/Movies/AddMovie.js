import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import "./AddMovie.css"; // Import custom styles

const AddMovie = () => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    releaseDate: "",
    ticketPrice: "",
    totalSeats: "",
    availableSeats: "",
    rows: "",
    columns: "",
    posterUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { totalSeats, rows, columns } = movieDetails;

      const totalSeatsNum = parseInt(totalSeats, 10);
      const rowsNum = parseInt(rows, 10);
      const columnsNum = parseInt(columns, 10);

      if (isNaN(totalSeatsNum) || totalSeatsNum <= 0) {
        setMessage("Total seats must be a positive number.");
        return;
      }

      if (isNaN(rowsNum) || rowsNum <= 0 || isNaN(columnsNum) || columnsNum <= 0) {
        setMessage("Rows and columns must be positive numbers.");
        return;
      }

      if (totalSeatsNum > rowsNum * columnsNum) {
        setMessage("Total seats cannot exceed rows * columns.");
        return;
      }

      const seatLayout = Array.from({ length: rowsNum }, (_, rowIndex) =>
        Array.from({ length: columnsNum }, (_, colIndex) =>
          rowIndex * columnsNum + colIndex < totalSeatsNum
        )
      );

      const movieWithSeatLayout = {
        ...movieDetails,
        totalSeats: totalSeatsNum,
        seatLayout,
      };

      const response = await axios.post(
        "http://localhost:5000/movies/add",
        movieWithSeatLayout
      );

      setMessage(response.data.message);
      setMovieDetails({
        title: "",
        description: "",
        genre: "",
        duration: "",
        releaseDate: "",
        ticketPrice: "",
        totalSeats: "",
        availableSeats: "",
        rows: "",
        columns: "",
        posterUrl: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
      setMessage("Failed to add movie. Please check your input and try again.");
    }
  };

  return (
    <div className="add-movie-container">
                  <Navbar/>

      <h2>Add New Movie</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="movie-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="form-left">
          <motion.input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={movieDetails.title}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.textarea
            name="description"
            placeholder="Description"
            value={movieDetails.description}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.input
            type="text"
            name="genre"
            placeholder="Genre"
            value={movieDetails.genre}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={movieDetails.duration}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.input
            type="date"
            name="releaseDate"
            placeholder="Release Date"
            value={movieDetails.releaseDate}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
        </div>

        <div className="form-right">
          <motion.input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price (₹)"
            value={movieDetails.ticketPrice}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={movieDetails.totalSeats}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={movieDetails.availableSeats}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.input
            type="number"
            name="rows"
            placeholder="Rows"
            value={movieDetails.rows}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.input
            type="number"
            name="columns"
            placeholder="Columns"
            value={movieDetails.columns}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
          <motion.input
            type="text"
            name="posterUrl"
            placeholder="Poster URL"
            value={movieDetails.posterUrl}
            onChange={handleChange}
            required
            className="movie-input"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Add Movie
        </motion.button>
      </motion.form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddMovie;
