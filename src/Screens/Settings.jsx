import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Clean Scape.png';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
import './Settings.css'; // Assuming you have a separate CSS file for your styles

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  // Set the theme based on localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Toggle dark mode and store the preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Save the mode in localStorage

      // Apply styles to the body element directly
      document.body.style.backgroundColor = newMode ? '#121212' : '#ffffff';
      document.body.style.color = newMode ? '#ffffff' : '#000000';

      return newMode;
    });
  };

  const closeAboutModal = () => setAboutModal(false);

  return (
    <div className={`settings-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header */}
      <header className="top-nav">
        <div className="logo-title">
          <img src={Logo} alt="Clean Scape Logo" className="logo" />
          <h2 className="title">Clean Scape</h2>
        </div>
        <nav className="nav-links">
          <Link to="/AdminDashboard">Dashboard</Link>
          <ComplaintDropdown />
          <Link to="/ManageCategory">Manage Category</Link>
          <Link to="/ManageStaff">Manage Staffs</Link>
          <Link to="/ManageUsers">Manage Users</Link>
          <Link to="/Settings" className="selected">Settings</Link>
        </nav>
        <button className="logout-button">Logout</button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Settings</h1>
        </header>
        <div className="settings-options">
          <button className="toggle-dark-mode" onClick={toggleDarkMode}>
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button className="about-clean-scape" onClick={() => setAboutModal(true)}>
            About Clean Scape
          </button>
          <button className="about-clean-scape" >
          Help/Support Section
          </button>
          {/* Language Selection */}
          <div className="language-selection">
            <label htmlFor="language">Select Language:</label>
            <select id="language"   >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>
      </main>

      {/* About Modal */}
      {aboutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>About Clean Scape</h2>
            <p>CLEAN SCAPE is a mobile application designed to improve community engagement by allowing users to easily report local issues, such as waste management, streetlights, and road problems. The app simplifies the process of issue reporting, provides tracking for resolution progress, and enables users to stay updated on the status of their concerns. By offering a user-friendly interface and seamless interaction with local authorities, CLEAN SCAPE aims to enhance community involvement and foster a cleaner, safer, and more sustainable environment.</p>
            <button onClick={closeAboutModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="footer">
        <div className="footer-line"></div>
      </footer>
    </div>
  );
};

export default SettingsPage;
