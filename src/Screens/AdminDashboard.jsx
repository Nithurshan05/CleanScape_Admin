import React from 'react';
import './AdminDashboard.css';
import Logo from '../Assets/Clean Scape.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Pie chart
);

const AdminDashboard = () => {
  // Data for the bar chart (Completed and Pending Tasks this month)
  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Weeks of the month
    datasets: [
      {
        label: 'Completed Tasks',
        data: [5, 8, 12, 15], // Replace with actual data
        backgroundColor: '#4CAF50', // Green for completed
        borderColor: '#4CAF50',
        borderWidth: 1,
      },
      {
        label: 'Pending Tasks',
        data: [3, 6, 7, 4], // Replace with actual data
        backgroundColor: '#FF9800', // Orange for pending
        borderColor: '#FF9800',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Completed vs Pending Tasks - This Month',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data for the pie chart (Completed and Pending Tasks this month)
  const pieData = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        data: [45, 30], // Replace with actual data (total completed and total pending tasks)
        backgroundColor: ['#4CAF50', '#FF9800'], // Green and Orange colors
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Task Status Overview',
      },
    },
  };

  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo-title">
          <img src={Logo} alt="Clean Scape Logo" className="logo" />
          <h2 className="title">Clean Scape</h2>
        </div>
        <nav className="nav-links">
          <Link to="/AdminDashboard" className="selected">Dashboard</Link>
          <ComplaintDropdown />
          <Link to="/ManageCategory">Manage Category</Link>
          <Link to="/ManageStaff">Manage Staffs</Link>
          <Link to="/ManageUsers">Manage Users</Link>
          <Link to="/Settings">Settings</Link>
        </nav>
        <Link to="/Login" type="button" className="logout-button"> Logout</Link>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="main-header">
          <h1>CLEAN SCAPE Admin Dashboard</h1>
        </header>

        <div className="cards">
          <div className="card">
            <div className="icon"><i className="fas fa-exclamation-circle"></i></div>
            <h3>Pending Complaints</h3>
            <p>5</p>
          </div>
          <div className="card">
            <div className="icon"><i className="fas fa-check-circle"></i></div>
            <h3>Completed Tasks</h3>
            <p>12</p>
          </div>
          <div className="card">
            <div className="icon"><i className="fas fa-users"></i></div>
            <h3>Total Users</h3>
            <p>20</p>
          </div>
          <div className="card">
            <div className="icon"><i className="fas fa-user-tie"></i></div>
            <h3>Total Staffs</h3>
            <p>8</p>
          </div>
          <div className="card">
            <div className="icon"><i className="fas fa-bell"></i></div>
            <h3>Total Notifications</h3>
            <p>10</p>
          </div>
          <div className="card">
            <div className="icon"><i className="fas fa-star"></i></div>
            <h3>Ratings</h3>
            <p>4.5/5</p>
          </div>
        </div>

        {/* Charts Container */}
        <div className="charts-container">
          {/* Bar Chart for Completed and Pending Tasks */}
          <div className="chart-container bar-chart">
            <h3>Tasks Overview for This Month (Bar Chart)</h3>
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Pie Chart for Completed vs Pending Tasks */}
          <div className="chart-container pie-chart">
            <h3>Task Status Overview (Pie Chart)</h3>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-line"></div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
