import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageUsers.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import Logo from '../Assets/Clean Scape.png';
import ComplaintDropdown from '../Componants/ComplaintDropdown';
export default function ManageUsers() {
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
    // Fetch all users from Firebase collection "Manage user"
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'User Register'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);
  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'User Register', id));
      setUsers(users.filter(user => user.id !== id));
      alert('user deleted successfully');
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUserData({ 
      fullname: user.fullname,
      gender: user.gender,
      mobile: user.mobile,
      address: user.address,
      email: user.email,
      password: user.password,
      imageUrl: user.imageUrl,
    });
  };
  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateDoc(doc(db, 'User Register', editingUser.id), newUserData);
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUserData } : user));
        setEditingUser('');
        setNewUserData({ 
          fullname: '', 
          gender: '',
          mobile: '',
          address: '',
          email: '',
          password: '',
          imageUrl: '',
        });
        alert('user updated successfully');
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaffs = users.filter(user =>
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-user">
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
          <Link to="/ManageStaff" >Manage Staffs</Link>
          <Link to="/ManageUsers" className="selected">Manage Users</Link>
          <Link to="/Settings">Settings</Link>
        </nav>
        <Link to="/Login" type="button" className="logout-button">
          Logout
        </Link>
      </header>

      <main className="main-content">
        <header className="main-header">
          <h1>Manage Users</h1>
        </header>

        <div className="heading-row">
          <input
            type="text"
            placeholder="Search user..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">Search</button>
          <Link to="/AddUserForm" className="add-user-button">+ Add New user</Link>
        </div>

        <div className="user-list">
          {filteredStaffs.map((user) => (
            <div key={user.id} className="user-item card">
              <div className="user-id">
                {user.fullname}
              </div>
              <div className="user-description">{user.email}</div>
              <div className="user-actions">
                <button className="view-data" onClick={() => setSelectedUser(user)}>View Details</button>
                <button className="edit-data" onClick={() => handleEditUser(user)}>Edit Details</button>
                <button className="delete-data" onClick={() => handleDeleteUser(user.id)}>Delete Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedUser && (
        <div className="overlay">
        <div className="details-box form-container">
          <h2>user Details</h2>
          
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
            <h3>Edit user Details</h3>
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
            <button onClick={handleUpdateUser}>Update user</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
