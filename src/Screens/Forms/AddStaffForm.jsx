import React, { useState } from 'react';
import './AddStaffForm.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config';
import { Link, useNavigate } from 'react-router-dom';


export default function AddStaffForm() {
  const [avatar, setAvatar] = useState(null);
  const [fullname, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedNewUser, setSelectedNewUser] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setImageUrl(e.target.files[0]?.name || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await addDoc(collection(db, "Manage Staff"), {
        fullname,
        gender,
        mobile,
        address,
        email,
        password,
        imageUrl
      });
      alert('Staff account created successfully!');
      // Clear the form after submission
      setName('');
      setGender('');
      setMobile('');
      setAddress('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAvatar(null);
      setImageUrl('');
    } catch (error) {
      console.error("Error creating staff account: ", error);
      alert('Error creating staff account');
    }
  };

  return (
    <div className="form-container">
      <h2>Create an Account - Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input value={fullname} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Full Name" required />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Enter Contact Number" required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required></textarea>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
        </div>
        <div className="form-group">
          <label>Avatar</label>
          <input type="file" onChange={handleAvatarChange} />
          {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}
        </div>
        <div className="form-actions">
        <Link to="/ManageStaff" type="button" className="back-btn"> Back</Link>
          <button type="submit" className="register-btn" >Save</button>
        </div>
      </form>
    </div>
  );
};

