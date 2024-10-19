// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/cashiers">Cashiers</Link></li>
        <li><Link to="/bill">Create Bill</Link></li>
        <li><Link to="/restaurant-info">Restaurant Info</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;