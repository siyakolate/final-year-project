import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: '',
    ingredients: '',
    usageInstructions: '',
    benefits: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stockQuantity: product.stockQuantity || '',
        imageUrl: product.imageUrl || '',
        ingredients: product.ingredients || '',
        usageInstructions: product.usageInstructions || '',
        benefits: product.benefits || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.stockQuantity || formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Valid stock quantity is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity)
      };
      
      onSave(productData);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          {product ? 'Edit Product' : 'Add New Product'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <div className="invalid-feedback">{errors.productName}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category *</label>
              <select
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Oils">Oils</option>
                <option value="Powders">Powders</option>
                <option value="Tablets">Tablets</option>
                <option value="Syrups">Syrups</option>
                <option value="Creams">Creams</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description *</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter product description"
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Stock Quantity *</label>
              <input
                type="number"
                className={`form-control ${errors.stockQuantity ? 'is-invalid' : ''}`}
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="0"
              />
              {errors.stockQuantity && (
                <div className="invalid-feedback">{errors.stockQuantity}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <textarea
              className="form-control"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="2"
              placeholder="List ingredients separated by commas"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Usage Instructions</label>
            <textarea
              className="form-control"
              name="usageInstructions"
              value={formData.usageInstructions}
              onChange={handleChange}
              rows="2"
              placeholder="How to use this product"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Benefits</label>
            <textarea
              className="form-control"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows="2"
              placeholder="List the benefits of this product"
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
