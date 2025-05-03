import React, { useState } from 'react';
import './ManageCategory.css';
import Logo from '../Assets/Clean Scape.png';
import { Link, useNavigate } from 'react-router-dom';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
const ManageCategory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryList = [
    { id: 1, name: 'Garbage' },
    { id: 2, name: 'Street Light' },
    { id: 3, name: 'Road Damage' },
  ];
  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleViewData = (category) => {
    setSelectedCategory(category);
  };
  const handleBackToHome = () => {
    setSelectedCategory(null);
  };
  return (
    <div className="manage-category">
      {/* Header */}
      <header className="top-nav">
        <div className="logo-title">
          <img src={Logo} alt="Clean Scape Logo" className="logo" />
          <h2 className="title">Clean Scape</h2>
        </div>
        <nav className="nav-links">
          <Link to="/AdminDashboard">Dashboard</Link>
          <ComplaintDropdown /> 
          <Link to="/ManageCategory" className="selected">Manage Category</Link>
          <Link to="/ManageStaff" >Manage Staffs</Link>
          <Link to="/ManageUsers">Manage Users</Link>
          <Link to="/Settings">Settings</Link>
        </nav>
        <Link to="/Login" type="button" className="logout-button">
          Logout
        </Link>
      </header>
      <main className="main-content">
        <header className="main-header">
          <h1>Manage Category</h1>
        </header>
        <div className="heading-row">
          <input
            type="text"
            placeholder="Search category..."
            className="searchar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
          <Link to="/AddCategory" className="add-category-button">+ Add New Category</Link>
        </div>

        <div className="category-list">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-item card">
              <div className="category-id">
                {category.id < 10 ? `0${category.id}` : category.id}
              </div>
              <div className="category-description">{category.name}</div>
              <div className="category-actions">
                <button className="view-data" onClick={() => handleViewData(category)}>View Details</button>
                <button className="edit-data">Edit Details</button>
                <button className="delete-data">Delete Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedCategory && (
        <div className="overlay">
          <div className="details-box">
            <img src="waste-image.jpg" alt="Waste Image" className="details-image" />
            <div className="details-info">
              <div className="detail-item">
                <strong>Type:</strong> {selectedCategory.name}
              </div>
              <button className="back-to-home" onClick={handleBackToHome}>Back to Home</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
