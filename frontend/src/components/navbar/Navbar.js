import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -50 }}  // Slide from above
      animate={{ opacity: 1, y: 0 }}    // Fade in
      transition={{ duration: 1, ease: "easeOut" }}  // Smooth transition
    >
      <div className="logo">ShowStash</div>
      <motion.ul className="nav-links">
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">Home</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/booking-confirm">Dashboard</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/add-movie">Add Movie</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/movies">Movies</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/signin">Sign In</Link>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
