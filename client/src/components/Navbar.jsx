import React from 'react';

const Navbar = () => (
  <nav style={{
    backgroundColor: '#d7ccc8', 
    padding: '15px 30px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <h1 style={{
      color: '#4e342e', 
      margin: 0, 
      fontFamily: 'Arial, sans-serif', 
      fontWeight: 'bold'
    }}>
      Bug Tracker
    </h1>
  </nav>
);

export default Navbar;
