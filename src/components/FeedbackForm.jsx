import React, { useState } from "react";
import api from "../services/api";

export default function FeedbackForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    console.log('Submitting feedback data:', form); // Debug log

    try {
      await api.post("/feedback", form);

      setStatus({ type: "success", text: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "", rating: 5 });

    } catch (err) {
      console.error('Feedback submission error:', err); // Enhanced error logging
      setStatus({ type: "danger", text: "Failed to send message." });
    }

    setLoading(false);
  }

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">Send Us a Message</h5>

      {status && (
        <div className={`alert alert-${status.type}`}>
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Rating</label>
  <select
    name="rating"
    value={form.rating}
    onChange={handleChange}
    className="form-control"
    required
  >
    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
    <option value="4">⭐⭐⭐⭐ (4)</option>
    <option value="3">⭐⭐⭐ (3)</option>
    <option value="2">⭐⭐ (2)</option>
    <option value="1">⭐ (1)</option>
  </select>
</div>
        

        <div className="mb-3">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            placeholder="Your Message"
            rows="4"
            required
          />
        </div>

      
        <button
          className="btn btn-success w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}