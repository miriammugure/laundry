import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/users">See Users</Link></li>
          <li><Link to="/admin/booking">See Bookings</Link></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
