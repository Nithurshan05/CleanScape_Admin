import React, { useState } from 'react';
import './AddStaffForm.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCategory() {
  const [avatar, setAvatar] = useState(null);
  const [categoryType, setCategoryType] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // For preview
      setImageFile(file); // Save file for further use if needed (e.g., uploading to storage)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryType || !imageFile) {
      alert('Please fill in all fields and upload an avatar.');
      return;
    }

    try {
      // Save category data to Firestore
      await addDoc(collection(db, "Manage Category"), {
        categoryType,
        imageUrl: avatar // Save avatar preview URL (You can replace with storage URL after uploading)
      });

      alert('Category created successfully!');
      // Clear the form after submission
      setCategoryType('');
      setAvatar(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error creating category: ", error);
      alert('Error creating category.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type of Category</label>
          <input
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            type="text"
            placeholder="Type of Category"
            required
          />
        </div>
        <div className="form-group">
          <label>Avatar</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} required />
          {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}
        </div>
        <div className="form-actions">
          <Link to="/ManageCategory" className="back-btn">Back</Link>
          <button type="submit" className="register-btn">Save</button>
        </div>
      </form>
    </div>
  );
}
