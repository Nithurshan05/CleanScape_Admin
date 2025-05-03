import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageStaff.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import Logo from '../Assets/Clean Scape.png';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
export default function ManageStaff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ 
    fullname: '', 
    gender: '',
    mobile: '',
    address: '',
    email: '',
    password: '',
    imageUrl: '', 
  });
  useEffect(() => {
    // Fetch all users from Firebase collection "Manage Staff"
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Manage Staff'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);
  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'Manage Staff', id));
      setUsers(users.filter(staff => staff.id !== id));
      alert('Staff deleted successfully');
    } catch (error) {
      console.error("Error deleting staff: ", error);
    }
  };
  const handleEditUser = (staff) => {
    setEditingUser(staff);
    setNewUserData({ 
      fullname: staff.fullname,
      gender: staff.gender,
      mobile: staff.mobile,
      address: staff.address,
      email: staff.email,
      password: staff.password,
      imageUrl: staff.imageUrl,
    });
  };
  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateDoc(doc(db, 'Manage Staff', editingUser.id), newUserData);
        setUsers(users.map(staff => staff.id === editingUser.id ? { ...staff, ...newUserData } : staff));
        setEditingUser(null);
        setNewUserData({ 
          fullname: '', 
          gender: '',
          mobile: '',
          address: '',
          email: '',
          password: '',
          imageUrl: '',
        });
        alert('Staff updated successfully');
      } catch (error) {
        console.error("Error updating staff: ", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaffs = users.filter(staff =>
    staff.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-staff">
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
          <Link to="/ManageStaff" className="selected">Manage Staffs</Link>
          <Link to="/ManageUsers">Manage Users</Link>
          <Link to="/Settings">Settings</Link>
        </nav>
        <Link to="/Login" type="button" className="logout-button">
          Logout
        </Link>
      </header>

      <main className="main-content">
        <header className="main-header">
          <h1>Manage Staffs</h1>
        </header>
        <div className="heading-row">
          <input
            type="text"
            placeholder="Search staff..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">Search</button>
          <Link to="/AddStaffForm" className="add-staff-button">+ Add New Staff</Link>
        </div>

        <div className="staff-list">
          {filteredStaffs.map((staff) => (
            <div key={staff.id} className="staff-item card">
              <div className="staff-id">
                {staff.fullname}
              </div>
              <div className="staff-description">{staff.email}</div>
              <div className="staff-actions">
                <button className="view-data" onClick={() => setSelectedUser(staff)}>View Details</button>
                <button className="edit-data" onClick={() => handleEditUser(staff)}>Edit Details</button>
                <button className="delete-data" onClick={() => handleDeleteUser(staff.id)}>Delete Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedUser && (
        <div className="overlay">
        <div className="details-box form-container">
          <h2>Staff Details</h2>
          
          <div className="form-group">
            <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Address:</strong> {selectedUser.address}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Password:</strong> {selectedUser.password}</p>
          </div>
          
          <div className="form-group">
            <p><strong>Image:</strong></p>
            {selectedUser.imageUrl ? (
              <img src={selectedUser.imageUrl} alt="User Avatar" className="avatar-preview" />
            ) : (
              <p>No image available</p>
            )}
          </div>
          
          <div className="form-actions">
            <button onClick={() => setSelectedUser(null)} className="back-btn">Close</button>
          </div>
        </div>
      </div>      
      )}

      {editingUser && (
        <div className="overlay">
          <div className="edit-box">
            <h3>Edit Staff Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={newUserData.fullname}
              onChange={(e) => setNewUserData({ ...newUserData, fullname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Gender"
              value={newUserData.gender}
              onChange={(e) => setNewUserData({ ...newUserData, gender: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newUserData.mobile}
              onChange={(e) => setNewUserData({ ...newUserData, mobile: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newUserData.address}
              onChange={(e) => setNewUserData({ ...newUserData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Password"
              value={newUserData.password}
              onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewUserData({ ...newUserData, imageUrl: URL.createObjectURL(file) });
                }
              }}
            />             
            <button onClick={handleUpdateUser}>Update Staff</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
