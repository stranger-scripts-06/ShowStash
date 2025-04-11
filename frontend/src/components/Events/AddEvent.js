// src/components/Events/AddEvent.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EventsList";


const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Prepare the event data object
    const newEvent = {
      title,
      description,
      genre,
      duration,
      releaseDate,
      ticketPrice,
      totalSeats,
      availableSeats,
      posterUrl,
    };

    try {
      // Send POST request to add the event
      const response = await axios.post("http://localhost:5000/events/add", newEvent);
      if (response.status === 201) {
        alert("Event added successfully!");
        navigate("/events");
      }
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Failed to add event. Please check the inputs and try again.");
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>
      <form onSubmit={handleAddEvent} className="add-event-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ticket Price"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={availableSeats}
          onChange={(e) => setAvailableSeats(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Poster URL"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
