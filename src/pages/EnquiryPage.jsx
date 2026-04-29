import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EnquiryPage() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/enquiries/product/${productId}`,
        formData
      );

      setSuccess("Enquiry submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container py-5">

      <h3 className="mb-4">
        Enquiry for {product.productName}
      </h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input
          type="text"
          name="name"
          className="form-control mb-3"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          className="form-control mb-3"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="btn btn-success">
          Submit Enquiry
        </button>

        {success && (
          <div className="alert alert-success mt-3">
            {success}
          </div>
        )}

      </form>

    </div>
  );
}