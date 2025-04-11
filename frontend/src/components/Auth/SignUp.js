import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';  // Import motion for animations
import './SignUp.css';  // External CSS for background and container styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Network error. Check your server connection.');
      }
    }
  };

  return (
    <motion.div 
      className="signup1-page"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="signup1-container"
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Sign Up
        </motion.h2>
        
        <form onSubmit={handleSubmit}>
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <label htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="signup1-btn"
            initial={{ scale: 0.9 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            Sign Up
          </motion.button>
        </form>

        {message && 
          <motion.p 
            className="message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {message}
          </motion.p>
        }
      </motion.div>
    </motion.div>
  );
};

export default Signup;
