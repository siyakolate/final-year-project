import React, { useState } from 'react';
import api from '../services/api.jsx';

export default function EnquiryForm({ productId, productName }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: productName || productId || '', message: '' });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/enquiries', form);
      setStatus({ type: 'success', text: 'Enquiry submitted successfully.' });
      setForm({ name: '', email: '', phone: '', product: productName || productId || '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'danger', text: 'Failed to submit enquiry.' });
    }
  }

  return (
    <div>
      {status && <div className={`alert alert-${status.type}`}>{status.text}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Name" required />
        </div>
        <div className="mb-2">
          <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="Email" required />
        </div>
        <div className="mb-2">
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Phone" />
        </div>
        <div className="mb-2">
          <input name="product" value={form.product} onChange={handleChange} className="form-control" placeholder="Product" readOnly />
        </div>
        <div className="mb-2">
          <textarea name="message" value={form.message} onChange={handleChange} className="form-control" placeholder="Message" rows="3" />
        </div>
        <button className="btn btn-primary btn-sm" type="submit">Send Enquiry</button>
      </form>
    </div>
  );
}
