import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import motion for animations
import './SignIn.css';  // External CSS for background and container styling


const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error message

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', response.data.username); // Optional, to display later

      alert('Login successful');
      navigate('/'); // Redirect to dashboard or home page after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    
    <motion.div 
      className="signin-page"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="signin-container"
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Sign In
        </motion.h2>
        
        <form onSubmit={handleSignIn}>
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            initial={{ x: -30, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
          
          {error && <motion.p className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{error}</motion.p>}
          
          <motion.button 
            type="submit" 
            className="signin-btn"
            initial={{ scale: 0.9 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Sign In
          </motion.button>
        </form>

        <motion.div 
          className="signup-container"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p>Not registered? <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button></p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignInPage;
