import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // Today
  });

  useEffect(() => {
    loadSalesData();
  }, [dateRange]);

  const loadSalesData = async () => {
    try {
      setLoading(true);
      // Get real enquiries data from your API
      const response = await api.get('/enquiries');
      const enquiries = response.data || [];
      
      // Transform real enquiries into sales data
      const sales = enquiries.map(enquiry => ({
        id: enquiry.enquiryId,
        date: enquiry.createdAt,
        customerName: enquiry.name,
        customerEmail: enquiry.email,
        customerPhone: enquiry.phone || 'N/A',
        product: enquiry.product?.productName || 'Unknown Product',
        productId: enquiry.product?.productId || 'N/A',
        category: enquiry.product?.category || 'General',
        amount: enquiry.product?.price || 0, // Use actual product price
        status: enquiry.status === 'RESPONDED' ? 'Completed' : 'Pending',
        message: enquiry.message || ''
      })).filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(dateRange.startDate) && saleDate <= new Date(dateRange.endDate);
      });

      setSalesData(sales);
    } catch (error) {
      console.error('Failed to load sales data:', error);
      setSalesData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintSalesReport = () => {
    const totalRevenue = salesData.reduce((sum, sale) => sum + (sale.amount || 0), 0);
    const completedSales = salesData.filter(sale => sale.status === 'Completed');
    const completedRevenue = completedSales.reduce((sum, sale) => sum + (sale.amount || 0), 0);

    const printContent = `
      <html>
        <head>
          <title>Sales Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #28a745; }
            .date-range { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
            .summary { margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; }
            .summary-item { display: inline-block; margin-right: 30px; margin-bottom: 10px; }
            .summary-label { font-weight: bold; color: #666; }
            .summary-value { font-size: 18px; color: #28a745; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .badge-completed { background-color: #28a745; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .badge-pending { background-color: #ffc107; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .amount { font-weight: bold; color: #28a745; }
            .date { font-size: 12px; color: #666; margin-top: 10px; }
            .customer-info { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h1>Enquiries & Sales Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          <div class="date-range">
            <strong>Period:</strong> ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}
          </div>
          
          <div class="summary">
            <div class="summary-item">
              <div class="summary-label">Total Enquiries:</div>
              <div class="summary-value">${salesData.length}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Responded:</div>
              <div class="summary-value">${completedSales.length}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Potential Revenue:</div>
              <div class="summary-value">₹${totalRevenue.toFixed(2)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Confirmed Revenue:</div>
              <div class="summary-value">₹${completedRevenue.toFixed(2)}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Product</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${salesData.map(sale => `
                <tr>
                  <td>${new Date(sale.date).toLocaleDateString()}</td>
                  <td>
                    <div style="font-weight: bold;">${sale.customerName}</div>
                    <div class="customer-info">${sale.customerEmail}</div>
                  </td>
                  <td>${sale.customerPhone}</td>
                  <td>${sale.product}</td>
                  <td><span class="amount">₹${sale.amount.toFixed(2)}</span></td>
                  <td>
                    <span class="${sale.status === 'Completed' ? 'badge-completed' : 'badge-pending'}">
                      ${sale.status}
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

  const totalRevenue = salesData.reduce((sum, sale) => sum + (sale.amount || 0), 0);
  const completedSales = salesData.filter(sale => sale.status === 'Completed');
  const completedRevenue = completedSales.reduce((sum, sale) => sum + (sale.amount || 0), 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success">Sales Report</h3>
        <button
          className="btn btn-outline-success"
          onClick={handlePrintSalesReport}
          title="Print Sales Report"
        >
          <i className="bi bi-printer"></i> Print
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filter by Date Range</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-success w-100" onClick={loadSalesData}>
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Enquiries</h6>
              <h3 className="text-primary">{salesData.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Responded</h6>
              <h3 className="text-success">{completedSales.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Potential Revenue</h6>
              <h3 className="text-success">₹{totalRevenue.toFixed(0)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Confirmed Revenue</h6>
              <h3 className="text-success">₹{completedRevenue.toFixed(0)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Enquiry Details</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-success"></div>
            </div>
          ) : salesData.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No enquiries found for the selected period.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Product</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id}>
                      <td>{new Date(sale.date).toLocaleDateString()}</td>
                      <td>
                        <div className="fw-semibold">{sale.customerName}</div>
                        <small className="text-muted">{sale.customerEmail}</small>
                      </td>
                      <td>{sale.customerPhone}</td>
                      <td>{sale.product}</td>
                      <td className="fw-bold text-success">₹{sale.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${
                          sale.status === 'Completed' ? 'bg-success' : 'bg-warning'
                        }`}>
                          {sale.status}
                        </span>
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

export default SalesReport;
