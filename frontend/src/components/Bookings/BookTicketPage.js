import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { motion } from "framer-motion";
import "./BookTicketPage.css";
import Navbar from "../navbar/Navbar";


const BookTicketPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (err) {
        setError("Invalid session. Please log in again.");
        return;
      }
    } else {
      setError("You need to log in to book tickets.");
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${id}`);
        const movieData = response.data;

        if (!movieData.seatLayout || movieData.seatLayout.length === 0) {
          const totalSeats = movieData.totalSeats;
          const rows = Math.ceil(totalSeats / 10);
          const seatsPerRow = Math.min(10, totalSeats);

          movieData.seatLayout = Array.from({ length: rows }, (_, rowIndex) =>
            Array.from(
              { length: seatsPerRow },
              (_, colIndex) => rowIndex * seatsPerRow + colIndex < totalSeats
            )
          );
        }

        setMovie(movieData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSeatSelection = (row, col) => {
    const alreadySelected = selectedSeats.some(
      (seat) => seat[0] === row && seat[1] === col
    );

    if (alreadySelected) {
      setSelectedSeats(
        selectedSeats.filter((seat) => !(seat[0] === row && seat[1] === col))
      );
    } else {
      setSelectedSeats([...selectedSeats, [row, col]]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * movie.ticketPrice;
  };

  const handleBooking = async () => {
    if (!userId) {
      setError("Please log in to book tickets.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/bookings/bookticket",
        {
          userId,
          movieId: id,
          selectedSeats,
        }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/payment"), 2000);
    } catch (err) {
      setError("Failed to book tickets. Please try again.");
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    
    <motion.div
      className="book-ticket-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar/>

      <div className="content-container">
        {/* Left Section */}
        <motion.div
          className="left-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1>{movie.title}</h1>
          <div>
          <p>
            <strong>Ticket Price:</strong> ${movie.ticketPrice}
          </p>
          
            <p>
              <strong>Selected Seats:</strong> {selectedSeats.length}
            </p>
            <p>
              <strong>Total Price:</strong> ${calculateTotalPrice()}
            </p>
            <br></br>
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || !userId}
              className="book-button"
            >
              Proceed to Payment
            </button>
          </div>
        </motion.div>

        {/* Right Section - Seat Layout */}
        <motion.div
          className="right-section seat-layout"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1>Select Seats</h1>
          {movie.seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                <motion.span
                  key={seatIndex}
                  className={`seat ${seat ? "available" : "booked"} ${
                    selectedSeats.some(
                      ([r, c]) => r === rowIndex && c === seatIndex
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => seat && handleSeatSelection(rowIndex, seatIndex)}
                  title={`Row ${rowIndex + 1}, Seat ${seatIndex + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {seat ? "" : "X"}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {successMessage && (
        <motion.p
          className="success-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {successMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default BookTicketPage;
