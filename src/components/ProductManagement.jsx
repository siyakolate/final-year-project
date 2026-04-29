import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter(p => p.productId !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProduct = await productService.updateProduct(
          editingProduct.productId,
          productData
        );
        setProducts(products.map(p => 
          p.productId === editingProduct.productId ? updatedProduct : p
        ));
        alert('Product updated successfully!');
      } else {
        // Add new product
        const newProduct = await productService.createProduct(productData);
        setProducts([...products, newProduct]);
        alert('Product added successfully!');
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handlePrintProducts = () => {
    const printContent = `
      <html>
        <head>
          <title>Products Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #28a745; }
            .summary { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            .summary-item { display: inline-block; margin-right: 30px; }
            .summary-label { font-weight: bold; color: #666; }
            .summary-value { font-size: 18px; color: #28a745; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .badge-success { background-color: #28a745; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .badge-warning { background-color: #ffc107; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .badge-danger { background-color: #dc3545; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .badge-info { background-color: #17a2b8; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .date { font-size: 12px; color: #666; margin-top: 10px; }
            .price { font-weight: bold; color: #28a745; }
          </style>
        </head>
        <body>
          <h1>Products Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          
          <div class="summary">
            <div class="summary-item">
              <div class="summary-label">Total Products:</div>
              <div class="summary-value">${filteredProducts.length}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">In Stock:</div>
              <div class="summary-value">${filteredProducts.filter(p => p.stockQuantity > 0).length}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Out of Stock:</div>
              <div class="summary-value">${filteredProducts.filter(p => p.stockQuantity === 0).length}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts.map(product => `
                <tr>
                  <td>
                    <div style="font-weight: bold;">${product.productName}</div>
                    <div style="font-size: 11px; color: #666;">${product.description?.substring(0, 80)}${product.description?.length > 80 ? '...' : ''}</div>
                  </td>
                  <td><span class="badge-info">${product.category || 'N/A'}</span></td>
                  <td><span class="price">₹${product.price?.toFixed(2)}</span></td>
                  <td>${product.stockQuantity} units</td>
                  <td>
                    <span class="${product.stockQuantity > 10 ? 'badge-success' : product.stockQuantity > 0 ? 'badge-warning' : 'badge-danger'}">
                      ${product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success">Product Management</h3>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-success"
            onClick={handlePrintProducts}
            title="Print Products"
          >
            <i className="bi bi-printer"></i> Print
          </button>
          <button
            className="btn btn-success"
            onClick={handleAddProduct}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Products ({filteredProducts.length})</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-4 text-muted">
              {searchTerm || filterCategory ? 'No products found matching your criteria.' : 'No products available.'}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.productId}>
                      <td>
                        <div className="d-flex align-items-center">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.productName}
                              className="me-3"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                          <div>
                            <div className="fw-semibold">{product.productName}</div>
                            <small className="text-muted">
                              {product.description?.substring(0, 50)}...
                            </small>
                          </div>
                        </div>
                      </td>
                     
                      <td>₹{product.price?.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${
                          product.stockQuantity > 10 ? 'bg-success' :
                          product.stockQuantity > 0 ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {product.stockQuantity} units
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          product.stockQuantity > 0 ? 'bg-success' : 'bg-danger'
                        }`}>
                          {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditProduct(product)}
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(product.productId)}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
