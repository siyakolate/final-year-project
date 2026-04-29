import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/src/assets/logo.png" 
            alt="Lakshmi Ayurvedic" 
            height="40" 
            className="me-2"
            style={{ maxHeight: '40px' }}
          />
          <span className="d-none d-md-inline">Lakshmi Ayurvedic</span>
        </NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNav}
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                onClick={closeNav}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/products" 
                onClick={closeNav}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/about" 
                onClick={closeNav}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/contact" 
                onClick={closeNav}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
