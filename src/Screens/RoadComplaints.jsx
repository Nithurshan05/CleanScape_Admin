import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Clean Scape.png';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

const RoadComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const querySnapshot = await getDocs(collection(db, 'Road Complaints'));
      const complaintsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(complaintsList);
    };
    fetchComplaints();
  }, []);

  const updateComplaintStatus = async (complaintId, status) => {
    try {
      const complaintRef = doc(db, 'Road Complaints', complaintId);
      await updateDoc(complaintRef, { status });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === complaintId ? { ...complaint, status } : complaint
        )
      );

      // Show message based on status
      const messages = {
        Solved: 'Complaint has been marked as solved!',
        Pending: 'Complaint has been marked as pending!',
        Rejected: 'Complaint has been rejected!',
      };
      alert(messages[status]);
    } catch (error) {
      console.error('Error updating complaint status: ', error);
    }
  };

  const getContainerStyle = (status) => {
    switch (status) {
      case 'Solved':
        return { backgroundColor: '#d0e8ff', color: 'black' }; // Light blue for Solved
      case 'Pending':
        return { backgroundColor: '#fff5cc', color: 'black' }; // Light orange for Pending
      case 'Rejected':
        return { backgroundColor: '#ffd6d6', color: 'black' }; // Light red for Rejected
      default:
        return { backgroundColor: '#F0F0F0', color: 'black' }; // Default style
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
          <h1>Road Complaints Confirmation</h1>
        </header>

        <div className="complaint-list">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="complaint-item card"
              style={getContainerStyle(complaint.status)}
            >
              <div className="complaint-id">
                {complaint.date < 10 ? `0${complaint.date}` : complaint.date}
              </div>
              <div className="complaint-description">
                {complaint.description || 'No description available'}
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
                  onClick={() => updateComplaintStatus(complaint.id, 'Solved')}
                >
                  Solve Complaint
                </button>
                <button
                  className="pending-problem"
                  onClick={() => updateComplaintStatus(complaint.id, 'Pending')}
                >
                  Pending Complaint
                </button>
                <button
                  className="reject-problem"
                  onClick={() => updateComplaintStatus(complaint.id, 'Rejected')}
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
              <p><strong>ID:</strong> {selectedComplaint.id}</p>
            </div>
            <div className="form-group">
              <p><strong>Status:</strong> {selectedComplaint.status || 'Not specified'}</p>
            </div>
            <div className="form-group">
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
            </div>
            <div className="form-group">
              <p><strong>Location:</strong> {selectedComplaint.location}</p>
            </div>
            <div className="form-group">
              <p><strong>Address:</strong> {selectedComplaint.address}</p>
            </div>
            <div className="form-group">
              <p><strong>Date:</strong> {selectedComplaint.date}</p>
            </div>
            <div className="form-group">
              <p><strong>Category:</strong> Road Damage</p>
            </div>
            <div className="form-group">
              <p><strong>Image:</strong></p>
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
              <button onClick={() => setSelectedComplaint(null)} className="back-btn">
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

export default RoadComplaints;
