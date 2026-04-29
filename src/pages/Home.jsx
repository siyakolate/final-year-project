import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section 
        className="hero-section text-center py-5"
        style={{
          backgroundImage: 'url("/src/assets/ayurvedic-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          minHeight: '60vh'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(44, 122, 75, 0.7)',
            zIndex: 1
          }}
        ></div>
        <div 
          className="container"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 text-white fw-bold mb-4">
                Lakshmi Ayurvedic
              </h1>
              <p className="lead text-white fs-4 mb-4">
                Wholesale & Retail Ayurvedic Medicines
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <a href="/products" className="btn btn-light btn-lg">
                  Explore Products
                </a>
                <a href="/contact" className="btn btn-outline-light btn-lg">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h3 className="text-brand mb-4">Our Vision</h3>
            <p className="lead text-muted-2 mb-4">
              Lakshmi Ayurvedic is committed to bringing traditional, natural
              Ayurvedic solutions to the community. Our purpose is to provide
              high-quality medicines and guidance for better health and wellness.
            </p>
            <p className="text-muted-2">
              Founded with respect for the ancient knowledge of Ayurveda, we aim to
              preserve and share remedies crafted from natural ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-light py-5">
        <div className="container">
          <h3 className="text-center text-brand mb-4">Why Choose Us</h3>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <i className="bi bi-shield-check text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Genuine Products</h5>
                  <p className="text-muted-2">Authentic, tested Ayurvedic medicines you can trust</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <i className="bi bi-shop text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Wholesale & Retail</h5>
                  <p className="text-muted-2">Flexible purchasing options for all customers</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body">
                  <i className="bi bi-person-badge text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Expert Guidance</h5>
                  <p className="text-muted-2">Experienced traditional practitioners to assist you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
