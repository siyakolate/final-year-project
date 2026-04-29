import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import ProductManagement from "../components/ProductManagement";
import SalesReport from "../components/SalesReport";
import ProductPerformanceReport from "../components/ProductPerformanceReport";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalContacts: 0,
    totalEnquiries: 0,
    totalProducts: 0,
    recentContacts: [],
    recentEnquiries: []
  });

  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [feedbackRes, enquiryRes, productsRes] = await Promise.all([
        api.get("/feedback"),
        api.get("/enquiries"),
        api.get("/products")
      ]);

      const feedbackData = feedbackRes.data || [];
      const enquiryData = enquiryRes.data || [];
      const productsData = productsRes.data || [];

      setStats({
        totalContacts: feedbackData.length,
        totalEnquiries: enquiryData.length,
        totalProducts: productsData.length,
        recentContacts: feedbackData.slice(-5).reverse(),
        recentEnquiries: enquiryData.slice(-5).reverse()
      });

    } catch (error) {
      console.error("Dashboard load failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const handlePrintContacts = () => {
    const printContent = `
      <html>
        <head>
          <title>Recent Contacts Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #28a745; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .date { font-size: 12px; color: #666; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Recent Contacts Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${stats.recentContacts.map(c => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${new Date(c.createdAt).toLocaleDateString()}</td>
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

  const handlePrintEnquiries = () => {
    const printContent = `
      <html>
        <head>
          <title>Recent Enquiries Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #28a745; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .badge-pending { background-color: #ffc107; color: #000; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .badge-responded { background-color: #28a745; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
            .date { font-size: 12px; color: #666; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Recent Enquiries Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${stats.recentEnquiries.map(e => `
                <tr>
                  <td>${e.name}</td>
                  <td>${e.product?.productName || 'N/A'}</td>
                  <td>
                    <span class="${e.status === 'RESPONDED' ? 'badge-responded' : 'badge-pending'}">
                      ${e.status}
                    </span>
                  </td>
                  <td>${new Date(e.createdAt).toLocaleDateString()}</td>
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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">Admin Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveView('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeView === 'products' ? 'active' : ''}`}
              onClick={() => setActiveView('products')}
            >
              Product Management
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeView === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveView('sales')}
            >
              Sales Report
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeView === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveView('performance')}
            >
              Product Performance
            </button>
          </li>
        </ul>
      </div>

      {/* DASHBOARD VIEW */}
      {activeView === 'dashboard' && (
        <>
          {/* STAT CARDS */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>Total Contacts</h5>
                  <h2>{stats.totalContacts}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>Total Enquiries</h5>
                  <h2>{stats.totalEnquiries}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>Total Products</h5>
                  <h2>{stats.totalProducts}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT CONTACTS */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Contacts</h5>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={handlePrintContacts}
                    title="Print Contacts"
                  >
                    <i className="bi bi-printer"></i> Print
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentContacts.map((c) => (
                        <tr key={c.feedbackId}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>
                            {new Date(c.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RECENT ENQUIRIES */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Enquiries</h5>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={handlePrintEnquiries}
                    title="Print Enquiries"
                  >
                    <i className="bi bi-printer"></i> Print
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentEnquiries.map((e) => (
                        <tr key={e.enquiryId}>
                          <td>{e.name}</td>
                          <td>{e.product?.productName}</td>
                          <td>
                            <span className={`badge ${
                              e.status === "RESPONDED"
                                ? "bg-success"
                                : "bg-warning"
                            }`}>
                              {e.status}
                            </span>
                          </td>
                          <td>
                            {new Date(e.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PRODUCT MANAGEMENT VIEW */}
      {activeView === 'products' && (
        <ProductManagement />
      )}

      {/* SALES REPORT VIEW */}
      {activeView === 'sales' && (
        <SalesReport />
      )}

      {/* PRODUCT PERFORMANCE VIEW */}
      {activeView === 'performance' && (
        <ProductPerformanceReport />
      )}

    </div>
  );
}