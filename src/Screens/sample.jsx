import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config'; // Assuming db is configured in config.js
import './ManageUsers.css';
import Logo from '../Assets/Clean Scape.png';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    // Fetch all users from Firebase collection "User Register"
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'User Register'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const docRef = await addDoc(collection(db, 'User Register'), newUserData);
      setUsers([...users, { id: docRef.id, ...newUserData }]);
      setNewUserData({ name: '', email: '', password: '' });
      alert('User added successfully');
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'User Register', id));
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUserData({ name: user.name, email: user.email, password: user.password });
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateDoc(doc(db, 'User Register', editingUser.id), newUserData);
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUserData } : user));
        setEditingUser(null);
        setNewUserData({ name: '', email: '', password: '' });
        alert('User updated successfully');
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-users">
      <header className="top-nav">
        <div className="logo-title">
          <img src={Logo} alt="Clean Scape Logo" className="logo" />
          <h2 className="title">Clean Scape</h2>
        </div>
        <button className="logout-button">Logout</button>
      </header>

      <main className="main-content">
        <header className="main-header">
          <h1>Manage Users</h1>
        </header>

        <div className="heading-row">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleAddUser} className="add-user-button">+ Add New User</button>
        </div>

        <div className="user-list">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
              <button onClick={() => setSelectedUser(user)}>View</button>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>

      {selectedUser && (
        <div className="overlay">
          <div className="details-box">
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Password:</strong> {selectedUser.password}</p>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="overlay">
          <div className="edit-box">
            <h3>Edit User Details</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserData.password}
              onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
            />
            <button onClick={handleUpdateUser}>Update User</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
