// components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/users/bookings'); // Endpoint to fetch bookings for the user
        setUserBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      <div>
        {userBookings.map((booking) => (
          <div key={booking._id}>
            <h3>Movie: {booking.movie.title}</h3>
            <p>Total Price: {booking.totalPrice}</p>
            <p>Status: {booking.status}</p>
            <p>Seats: {booking.selectedSeats.map(seat => `Row ${seat[0] + 1}, Col ${seat[1] + 1}`).join(', ')}</p>

            <h3>QR Code</h3>
            <img src={booking.qrCode} alt="QR Code" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
