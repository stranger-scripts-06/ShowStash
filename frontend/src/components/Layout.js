import React from 'react';
import { Outlet } from 'react-router-dom'; // Allows rendering of child routes

import './Layout.css'; // CSS file for the background effect

const Layout = () => {
  return (
    <div className="layout">
      <div className="el"> {/* Background Effect */}
        <div className="content">
          <Outlet /> {/* This will render the page content */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
