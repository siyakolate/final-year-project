import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {

  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contact, setContact] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const response = await api.post("/admins/login", {
        username,
        password
      });

      if (response.data) {
        setLoggedIn(true);
        loadAdminData();
      }

    } catch (err) {
      setError("Invalid username or password");
    }
  };

  // ================= LOAD DATA =================
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [pRes, eRes, fRes, cRes] = await Promise.all([
        api.get("/products"),
        api.get("/enquiries"),
        api.get("/feedback"),
        api.get("/contact")
      ]);

      setProducts(pRes.data || []);
      setEnquiries(eRes.data || []);
      setFeedback(fRes.data || []);
      setContact(cRes.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  // ================= BEFORE LOGIN =================
  if (!loggedIn) {
    return (
      <div className="container py-5">
        <h3>Admin Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading admin data...</div>;

  // ================= ADMIN PANEL =================
  return (
    <div className="container py-4">
      <h2>Admin Dashboard</h2>

      {/* PRODUCTS */}
      <section className="mb-5">
        <h5>Products</h5>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ENQUIRIES */}
      <section className="mb-5">
        <h5>Enquiries</h5>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((q) => (
              <tr key={q.enquiryId}>
                <td>{q.enquiryId}</td>
                <td>{q.name}</td>
                <td>{q.email}</td>
                <td>{q.phone}</td>
                <td>{q.product?.productName}</td>
                <td>{q.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* FEEDBACK */}
      <section className="mb-5">
        <h5>Feedback</h5>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((f) => (
              <tr key={f.feedbackId}>
                <td>{f.feedbackId}</td>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td>{f.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CONTACT INFO */}
      <section>
        <h5>Contact Details</h5>
        {contact && (
          <>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <p>Address: {contact.address}</p>
          </>
        )}
      </section>

    </div>
  );
}