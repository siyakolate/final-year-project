import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading Products...</div>;
  }

  return (
    <div className="container py-4">

      <h2 className="text-center mb-4">Our Ayurvedic Products</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.productId}>
            <div className="card h-100 shadow-sm">

              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.productName}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{product.productName}</h5>
                <p className="text-muted small">
                  {product.description}
                </p>

                <h6 className="text-success">
                  ₹{product.price}
                </h6>

                <button
                  className="btn btn-success w-100 mt-2"
                  onClick={() =>
                    navigate(`/enquiry/${product.productId}`)
                  }
                >
                  Enquire Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}