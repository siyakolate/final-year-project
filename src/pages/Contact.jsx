import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

export default function Contact() {
  return (
    <div>
      <h2>Contact Us</h2>

      <div className="row">
        <div className="col-md-7 mb-3">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe 
                className="gmap_iframe" 
                width="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Laxmi Ayurvedics E Ward, Shahupuri, Kolhapur, Maharashtra 416001&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Lakshmi Ayurvedics Location"
              ></iframe>
            </div>
          </div>
          <style jsx>{`
            .mapouter {
              position: relative;
              text-align: right;
              width: 100%;
              height: 400px;
            }
            .gmap_canvas {
              overflow: hidden;
              background: none !important;
              width: 100%;
              height: 400px;
            }
            .gmap_iframe {
              height: 400px !important;
            }
          `}</style>
        </div>

        <div className="col-md-5">
          <h5>Contact Us</h5>
          <FeedbackForm />

          <hr />

          <h5>Contact Information</h5>
          <p className="mb-0">Phone: +91-9876543210</p>
          <p className="mb-0">Email: info@lakshmiayurvedic.com</p>
          <p className="mb-0">Address: E Ward, Shahupuri, Kolhapur, Maharashtra 416001</p>
        </div>
      </div>
    </div>
  );
}
