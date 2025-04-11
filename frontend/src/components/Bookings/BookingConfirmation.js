import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./BookingConfirmation.css"; // Custom styles
import Navbar from "../navbar/Navbar";


const BookingConfirmation = () => {
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [bookings, setBookings] = useState([]); 
  const [error, setError] = useState(""); 

  // Decode JWT token to extract user ID
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.userId);
      } catch (err) {
        setError("Invalid session. Please log in again.");
      }
    } else {
      setError("You need to log in to view your bookings.");
    }
  }, []);

  // Fetch user bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authorization token is missing. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/bookings/user/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      }
    };

    if (currentUserId) {
      fetchUserBookings();
    }
  }, [currentUserId]);

  return (
    <div className="booking-container">
            <Navbar/>

      {error && <p className="error-message">{error}</p>}
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="movie-ticket" key={booking._id}>
            <div className="ticket-header">
              <h3>{booking.movie?.title || "Unknown Movie"}</h3>
              <span className="ticket-status">{booking.status}</span>
            </div>
            <div className="ticket-details">
              <div className = "p1">
              <strong>Tickets:</strong> {booking.numberOfTickets}
              <br></br>
              <strong>Total Price:</strong> ₹{booking.totalPrice}
              <br></br>
             <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
            </div>
            </div>
            {/* Optional: Show selected seats */}
            {/* <div className="ticket-seats">
              <strong>Seats:</strong> {booking.selectedSeats.map(seat => `Row ${seat[0] + 1}, Col ${seat[1] + 1}`).join(', ')}
            </div> */}
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingConfirmation;
