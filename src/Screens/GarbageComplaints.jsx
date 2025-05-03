import React, { useState, useEffect } from 'react';
import './GuestCompliants.css';
import Logo from '../Assets/Clean Scape.png';
import { Link } from 'react-router-dom';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

const GarbageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all complaints from Firebase collection "Guest Complaints"
    const fetchComplaints = async () => {
      const querySnapshot = await getDocs(collection(db, 'Guest Complaints'));
      const complaintsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(complaintsList);
    };
    fetchComplaints();
  }, []);

  // Function to update complaint status in Firestore and show a message
  const updateComplaintStatus = async (complaintId, status, colorMessage) => {
    try {
      const complaintRef = doc(db, 'Guest Complaints', complaintId);
      await updateDoc(complaintRef, { status });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === complaintId ? { ...complaint, status } : complaint
        )
      );
      setMessage(`Complaint marked as ${status}`);
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  return (
    <div className="manage-complaints">
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
          <Link to="/Settings">Settings</Link>
        </nav>
        <Link to="/Login" type="button" className="logout-button">
          Logout
        </Link>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Garbage Complaints Confirmation</h1>
        </header>

        {/* Success Message */}
        {message && <div className="message-box">{message}</div>}

        <div className="complaint-list">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className={`complaint-item card ${
                complaint.status === 'Solved'
                  ? 'solved-bg'
                  : complaint.status === 'Pending'
                  ? 'pending-bg'
                  : complaint.status === 'Rejected'
                  ? 'rejected-bg'
                  : ''
              }`}
            >
              <div className="complaint-id">
                {complaint.date < 10 ? `0${complaint.date}` : complaint.date}
              </div>
              <div className="complaint-description">
                {complaint.address || 'No description available'}
              </div>
              <div className="complaint-status">
                <strong>Status:</strong> {complaint.status || 'Not specified'}
              </div>
              <div className="complaint-actions">
                <button
                  className="view-problem"
                  onClick={() => setSelectedComplaint(complaint)}
                >
                  View Complaint
                </button>
                <button
                  className="solve-problem"
                  onClick={() =>
                    updateComplaintStatus(complaint.id, 'Solved', '#d0e8ff')
                  }
                >
                  Solve Complaint
                </button>
                <button
                  className="pending-problem"
                  onClick={() =>
                    updateComplaintStatus(complaint.id, 'Pending', '#fff5cc')
                  }
                >
                  Pending Complaint
                </button>
                <button
                  className="reject-problem"
                  onClick={() =>
                    updateComplaintStatus(complaint.id, 'Rejected', '#ffd6d6')
                  }
                >
                  Reject Complaint
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Detailed View Modal */}
      {selectedComplaint && (
        <div className="overlay">
          <div className="details-box form-container">
            <h2>Complaint Details</h2>
            <div className="form-group">
              <p>
                <strong>ID:</strong> {selectedComplaint.id}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Status:</strong>{' '}
                {selectedComplaint.status || 'Not specified'}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Description:</strong> {selectedComplaint.description}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Location:</strong> {selectedComplaint.location}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Address:</strong> {selectedComplaint.address}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Date:</strong> {selectedComplaint.date}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Type of Waste:</strong>{' '}
                {selectedComplaint.type_of_waste || 'Garbage Complaints'}
              </p>
            </div>
            <div className="form-group">
              <p>
                <strong>Image:</strong>
              </p>
              {selectedComplaint.images && selectedComplaint.images[0] ? (
                <img
                  src={selectedComplaint.images[0]}
                  alt="Complaint Visual"
                  className="avatar-preview"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="form-actions">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="back-btn"
              >
                Close
              </button>
            </div>
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

export default GarbageComplaints;
