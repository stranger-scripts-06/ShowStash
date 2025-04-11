import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './Homepage.css';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <img
          src="https://i.pinimg.com/736x/b5/74/df/b574df9c1feca9031e1be09f57759873.jpg" // Replace with your desired image URL
          alt="Homepage banner"
          className="homepage-image"
        />
      </div>
    </>
  );
};

export default Homepage;
