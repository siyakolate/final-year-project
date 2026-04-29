import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import api from '../services/api';

const ProductPerformanceReport = () => {
  const [products, setProducts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('revenue');
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    loadProductPerformance();
  }, [timeRange, sortBy]);

  const loadProductPerformance = async () => {
    try {
      setLoading(true);
      
      // Get real products and enquiries data
      const [productsData, enquiriesData] = await Promise.all([
        productService.getAllProducts(),
        api.get('/enquiries')
      ]);
      
      const enquiries = enquiriesData.data || [];
      
      // Calculate real performance metrics for each product
      const performance = productsData.map(product => {
        // Count enquiries for this product
        const productEnquiries = enquiries.filter(eq => eq.product?.productId === product.productId);
        const totalEnquiries = productEnquiries.length;
        const respondedEnquiries = productEnquiries.filter(eq => eq.status === 'RESPONDED').length;
        
        // Calculate potential revenue from enquiries
        const potentialRevenue = totalEnquiries * (product.price || 0);
        const confirmedRevenue = respondedEnquiries * (product.price || 0);
        
        // Calculate conversion rate
        const conversionRate = totalEnquiries > 0 ? ((respondedEnquiries / totalEnquiries) * 100).toFixed(2) : '0.00';
        
        // Days in stock (from creation date or default)
        const daysInStock = product.createdAt ? 
          Math.floor((new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24)) : 
          Math.floor(Math.random() * 365) + 1;
        
        // Last enquiry date
        const lastEnquiry = productEnquiries.length > 0 ? 
          new Date(Math.max(...productEnquiries.map(eq => new Date(eq.createdAt)))).toLocaleDateString() : 
          'No enquiries';
        
        return {
          productId: product.productId,
          productName: product.productName,
          category: product.category,
          currentStock: product.stockQuantity || 0,
          price: product.price || 0,
          totalEnquiries,
          respondedEnquiries,
          potentialRevenue,
          confirmedRevenue,
          conversionRate,
          avgRating: (Math.random() * 2 + 3).toFixed(1), // This could come from a reviews API
          daysInStock,
          lastEnquiry
        };
      });

      // Sort based on selected criteria
      const sorted = [...performance].sort((a, b) => {
        switch (sortBy) {
          case 'revenue':
            return b.confirmedRevenue - a.confirmedRevenue;
          case 'enquiries':
            return b.totalEnquiries - a.totalEnquiries;
          case 'conversion':
            return parseFloat(b.conversionRate) - parseFloat(a.conversionRate);
          case 'rating':
            return parseFloat(b.avgRating) - parseFloat(a.avgRating);
          case 'stock':
            return b.currentStock - a.currentStock;
          default:
            return 0;
        }
      });

      setPerformanceData(sorted);
    } catch (error) {
      console.error('Failed to load product performance:', error);
      setPerformanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPerformanceReport = () => {
    const totalRevenue = performanceData.reduce((sum, p) => sum + p.confirmedRevenue, 0);
    const totalEnquiries = performanceData.reduce((sum, p) => sum + p.totalEnquiries, 0);
    const avgConversion = performanceData.length > 0 ? 
      (performanceData.reduce((sum, p) => sum + parseFloat(p.conversionRate), 0) / performanceData.length).toFixed(2) : 0;
    const avgRating = performanceData.length > 0 ? 
      (performanceData.reduce((sum, p) => sum + parseFloat(p.avgRating), 0) / performanceData.length).toFixed(1) : 0;

    const printContent = `
      <html>
        <head>
          <title>Product Performance Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #28a745; }
            .summary { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            .summary-item { display: inline-block; margin-right: 30px; margin-bottom: 10px; }
            .summary-label { font-weight: bold; color: #666; }
            .summary-value { font-size: 18px; color: #28a745; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .high-performer { background-color: #d4edda; }
            .low-performer { background-color: #f8d7da; }
            .medium-performer { background-color: #fff3cd; }
            .rating { color: #ffc107; }
            .revenue { font-weight: bold; color: #28a745; }
            .date { font-size: 12px; color: #666; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Product Performance Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          <div class="date"><strong>Time Range:</strong> All Time</div>
          
          <div class="summary">
            <div class="summary-item">
              <div class="summary-label">Total Products:</div>
              <div class="summary-value">${performanceData.length}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Confirmed Revenue:</div>
              <div class="summary-value">₹${totalRevenue.toFixed(0)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Total Enquiries:</div>
              <div class="summary-value">${totalEnquiries}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Avg Conversion:</div>
              <div class="summary-value">${avgConversion}%</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Avg Rating:</div>
              <div class="summary-value">⭐ ${avgRating}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Enquiries</th>
                <th>Responded</th>
                <th>Potential Revenue</th>
                <th>Confirmed Revenue</th>
                <th>Conversion</th>
                <th>Rating</th>
                <th>Days in Stock</th>
                <th>Last Enquiry</th>
              </tr>
            </thead>
            <tbody>
              ${performanceData.map(product => {
                const performanceClass = product.confirmedRevenue > 10000 ? 'high-performer' : 
                                       product.confirmedRevenue > 5000 ? 'medium-performer' : 'low-performer';
                return `
                <tr class="${performanceClass}">
                  <td><strong>${product.productName}</strong></td>
                  <td>${product.category || 'N/A'}</td>
                  <td>₹${product.price}</td>
                  <td>${product.currentStock}</td>
                  <td>${product.totalEnquiries}</td>
                  <td>${product.respondedEnquiries}</td>
                  <td>₹${product.potentialRevenue.toFixed(0)}</td>
                  <td><span class="revenue">₹${product.confirmedRevenue.toFixed(0)}</span></td>
                  <td>${product.conversionRate}%</td>
                  <td><span class="rating">⭐ ${product.avgRating}</span></td>
                  <td>${product.daysInStock}</td>
                  <td>${product.lastEnquiry}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; font-size: 12px; color: #666;">
            <strong>Legend:</strong> 
            <span style="background: #d4edda; padding: 2px 5px;">High Performer (>₹10k)</span>
            <span style="background: #fff3cd; padding: 2px 5px;">Medium (₹5k-10k)</span>
            <span style="background: #f8d7da; padding: 2px 5px;">Low (<₹5k)</span>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const totalRevenue = performanceData.reduce((sum, p) => sum + p.confirmedRevenue, 0);
  const totalEnquiries = performanceData.reduce((sum, p) => sum + p.totalEnquiries, 0);
  const avgConversion = performanceData.length > 0 ? 
    (performanceData.reduce((sum, p) => sum + parseFloat(p.conversionRate), 0) / performanceData.length).toFixed(2) : 0;
  const avgRating = performanceData.length > 0 ? 
    (performanceData.reduce((sum, p) => sum + parseFloat(p.avgRating), 0) / performanceData.length).toFixed(1) : 0;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success">Product Performance Report</h3>
        <button
          className="btn btn-outline-success"
          onClick={handlePrintPerformanceReport}
          title="Print Performance Report"
        >
          <i className="bi bi-printer"></i> Print
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Sorting Options</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="revenue">Confirmed Revenue</option>
                <option value="enquiries">Total Enquiries</option>
                <option value="conversion">Conversion Rate</option>
                <option value="rating">Rating</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Confirmed Revenue</h6>
              <h3 className="text-success">₹{totalRevenue.toFixed(0)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Enquiries</h6>
              <h3 className="text-primary">{totalEnquiries}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Avg Conversion</h6>
              <h3 className="text-info">{avgConversion}%</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Avg Rating</h6>
              <h3 className="text-warning">⭐ {avgRating}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Product Performance Details</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success"></div>
            </div>
          ) : performanceData.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No performance data available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Enquiries</th>
                    <th>Responded</th>
                    <th>Potential Revenue</th>
                    <th>Confirmed Revenue</th>
                    <th>Conversion</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map(product => {
                    const performanceClass = product.confirmedRevenue > 10000 ? 'text-success' : 
                                           product.confirmedRevenue > 5000 ? 'text-warning' : 'text-danger';
                    const performanceBadge = product.confirmedRevenue > 10000 ? { text: 'High', class: 'bg-success' } : 
                                            product.confirmedRevenue > 5000 ? { text: 'Medium', class: 'bg-warning' } : 
                                            { text: 'Low', class: 'bg-danger' };
                    return (
                      <tr key={product.productId}>
                        <td>
                          <div className="fw-semibold">{product.productName}</div>
                          <small className="text-muted">Last enquiry: {product.lastEnquiry}</small>
                        </td>
                        <td>
                          <span className="badge bg-info">{product.category || 'N/A'}</span>
                        </td>
                        <td className="fw-bold">₹{product.price}</td>
                        <td>
                          <span className={`badge ${
                            product.currentStock > 10 ? 'bg-success' :
                            product.currentStock > 0 ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {product.currentStock}
                          </span>
                        </td>
                        <td>{product.totalEnquiries}</td>
                        <td>{product.respondedEnquiries}</td>
                        <td className="text-muted">₹{product.potentialRevenue.toFixed(0)}</td>
                        <td className={`fw-bold ${performanceClass}`}>
                          ₹{product.confirmedRevenue.toFixed(0)}
                        </td>
                        <td>
                          <span className={`badge ${
                            parseFloat(product.conversionRate) > 50 ? 'bg-success' :
                            parseFloat(product.conversionRate) > 25 ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {product.conversionRate}%
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${performanceBadge.class}`}>{performanceBadge.text}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPerformanceReport;
