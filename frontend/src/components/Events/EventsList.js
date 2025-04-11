// src/components/Events/EventsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/all");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Navigate to Add Event page
  const goToAddEvent = () => {
    navigate("/add-event");
  };

  return (
    <div className="events-list-container">
      <h2>Events List</h2>
      <button onClick={goToAddEvent} className="add-event-button">
        Add New Event
      </button>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> ${event.ticketPrice}</p>
              <p><strong>Available Seats:</strong> {event.availableSeats}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
