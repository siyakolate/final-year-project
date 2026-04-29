import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-3">
      <div className="container">
        <div className="row align-items-center">
          {/* Company Info */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <img 
                src="/src/assets/logo.png" 
                alt="Lakshmi Ayurvedic" 
                height="45" 
                className="me-2"
                style={{ maxHeight: '45px' }}
              />
              <div>
                <h6 className="text-brand fw-bold mb-1">Lakshmi Ayurvedic</h6>
                <p className="text-muted-2 small mb-0">Authentic Ayurvedic Medicines Since 1985</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <nav>
              <Link to="/" className="text-muted-2 text-decoration-none me-3 small">Home</Link>
              <Link to="/products" className="text-muted-2 text-decoration-none me-3 small">Products</Link>
              <Link to="/about" className="text-muted-2 text-decoration-none me-3 small">About</Link>
              <Link to="/contact" className="text-muted-2 text-decoration-none small">Contact</Link>
            </nav>
          </div>

          {/* Social & Copyright */}
          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex gap-2 justify-content-center justify-content-md-end mb-2">
              <a href="#" className="text-muted-2 text-decoration-none">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-muted-2 text-decoration-none">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-muted-2 text-decoration-none">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="#" className="text-muted-2 text-decoration-none">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
            <p className="text-muted-2 small mb-0">© {currentYear} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
