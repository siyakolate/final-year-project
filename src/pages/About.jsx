import React from 'react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero mb-5">
        <h1 className="text-center">About Lakshmi Ayurvedic</h1>
        <p className="lead text-center">
          Discover the ancient wisdom of Ayurveda through our authentic formulations
        </p>
      </div>

      {/* Our Story */}
      <section className="container mb-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h3 className="text-brand text-center mb-4">Our Story</h3>
            <p className="text-muted-2 lead">
              Lakshmi Ayurvedic began as a small traditional herbal shop in 1985 and has grown 
              into a trusted supplier of authentic Ayurvedic medicines. Our story is rooted in 
              traditional wisdom and a deep commitment to natural health and wellness.
            </p>
            <p className="text-muted-2">
              Founded by Vaidya Lakshmi Devi, our journey started with a simple mission: 
              to make genuine Ayurvedic remedies accessible to everyone. Over the decades, we've 
              maintained the same principles of purity, authenticity, and care that guided us from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-brand-light py-5">
        <div className="container">
          <h3 className="text-brand text-center mb-4">Mission & Values</h3>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-shield-check text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Quality Assurance</h5>
                  <p className="text-muted-2">
                    Deliver natural, high-quality products with rigorous testing and traditional preparation methods
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-heart text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Authenticity</h5>
                  <p className="text-muted-2">
                    Preserve ancient Ayurvedic formulations and maintain traditional preparation techniques
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <i className="bi bi-people text-brand fs-1 mb-3"></i>
                  <h5 className="text-brand">Community Wellness</h5>
                  <p className="text-muted-2">
                    Educate communities about Ayurvedic wellness and promote holistic health practices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="container py-5">
        <h3 className="text-brand text-center mb-4">Our Expertise</h3>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h5 className="text-brand mb-3">Traditional Formulations</h5>
            <p className="text-muted-2">
              We specialize in classical Ayurvedic formulations including Chyawanprash, 
              various Kashayams, Arishtas, and traditional oils. Our products are 
              prepared following ancient texts and under the guidance of experienced Vaidyas.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h5 className="text-brand mb-3">Quality Sourcing</h5>
            <p className="text-muted-2">
              We source our herbs directly from trusted farmers and ensure they are 
              processed according to traditional standards. Each batch undergoes quality checks 
              to maintain purity and potency.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-light py-5">
        <div className="container">
          <h3 className="text-brand text-center mb-4">Our Impact</h3>
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <h2 className="text-brand mb-2">38+</h2>
              <p className="text-muted-2">Years of Service</p>
            </div>
            <div className="col-md-3 mb-3">
              <h2 className="text-brand mb-2">100+</h2>
              <p className="text-muted-2">Ayurvedic Products</p>
            </div>
            <div className="col-md-3 mb-3">
              <h2 className="text-brand mb-2">50K+</h2>
              <p className="text-muted-2">Happy Customers</p>
            </div>
            <div className="col-md-3 mb-3">
              <h2 className="text-brand mb-2">15+</h2>
              <p className="text-muted-2">Expert Practitioners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-5">
        <div className="text-center">
          <h3 className="text-brand mb-4">Experience Authentic Ayurveda</h3>
          <p className="text-muted-2 lead mb-4">
            Join thousands who trust Lakshmi Ayurvedic for their wellness journey
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="/products" className="btn btn-primary btn-lg">
              Explore Products
            </a>
            <a href="/contact" className="btn btn-outline-primary btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
