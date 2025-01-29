import React from 'react';
import './UserManagement.css';
import avatar from './assets/avatar.jpg'; 
import { useNavigate } from 'react-router-dom'; 
const UserManagement = () => {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate('/DeviceManagement'); 
  };
  return (
    <div className="user-management-page">
      <div className="logo">
        <div className="logo-title">GS</div>
        <div className="logo-subtitle">Global Storage</div>
      </div>

      <div className="content">
        <h1>Account information </h1>

        <div className="profile-section">
          <img src={avatar} alt="Avatar" className="profile-picture" />

          <div className="profile-details-1">
            <h4>Username</h4>
            <h4>Phone Number</h4>
            <h4>Role</h4>
            <h4>Gender</h4>
          </div>

          <div className="profile-details-2">
            <h4>Email Address</h4>
            <h4>Date of Birth</h4>
            <h4>Enter New Password</h4>
            <h4>City</h4>
            <div className='profile-button-wrap'>
            <button className="save-button">Save</button>
            </div>
          </div>

        </div>
       
      </div>
        <div className='go-to-device-wrap'>
          <button type="button" onClick={handleNavigate}>Go to Device Management</button>
        </div>
    </div>
  );
};

export default UserManagement;