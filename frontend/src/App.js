import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Movies from './components/Movies/MovieList';
import Events from './components/Events/EventsList';
import AddMovie from "./components/Movies/AddMovie";
// import MoviesList from "./components/Movies/MovieList";
import EventsList from "./components/Events/EventsList";
import AddEvent from "./components/Events/AddEvent";
import Homepage from './pages/Homepage';
import MovieDetails from "./components/Movies/MovieDetails";
import BookTicketPage from "./components/Bookings/BookTicketPage";
import BookingConfirmation from './components/Bookings/BookingConfirmation';
import PaymentForm from './components/Bookings/PaymentForm';
import Layout from './components/Layout';  // Import the Layout component






function App() {
  return (
    <Router>
     <Routes>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-movie" element={<AddMovie/>}/>
        {/* <Route path="/list-movies" element={<MoviesList />} /> */}
        <Route path="/add-event" element={<AddEvent/>}/>
        <Route path="/list-events" element={<EventsList />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/movies/:id" element={<MovieDetails/>} />
        <Route path="/bookticket/:id" element={<BookTicketPage/>} />
        <Route path="/booking-confirm" element={<BookingConfirmation/>} />
        <Route path="/payment" element={<PaymentForm/>} />






      </Routes>
    </Router>
  );
}

export default App;
