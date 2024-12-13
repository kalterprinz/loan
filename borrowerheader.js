import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Notifications from './notification';
import './borrowerdash.css'; 
const BorrowerHeader = () => {
    const navigate = useNavigate(); 

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
  
    const notifications = [
      { message: (<Link to="/comaker" style={{ textDecoration: "none", color: "inherit", fontFamily: "inherit" }}>You only have 3 weeks before your due date.</Link>), time: "2 days ago", },
      { message: "The funds have been deposited in your account. Congratulations!", time: "3 weeks ago" },
      { message: "Your application is now being reviewed.", time: "1 month ago" },
      { message: "Your application has been approved!", time: "1 month ago"},
      { message: "Your application is now being reviewed.", time: "1 month ago" },
      { message: "Your application has been approved!", time: "1 month ago"},
      { message: "Your application is now being reviewed.", time: "1 month ago" },
      { message: "Your application has been approved!", time: "1 month ago"},

    ];
  
    const [loggedIn, setLoggedIn] = useState(true);
  
    const handleLogout = () => {
      // Remove token and other user info from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      setLoggedIn(false); // Update loggedIn state to false
      navigate('/login'); // Redirect to login page after logout
    };
  
    // Toggle Notification Dropdown
    const toggleNotifications = () => {
      setIsNotificationVisible(!isNotificationVisible);
      setIsProfileVisible(false);  // Close profile when notifications are toggled
    };
  
    // Toggle Profile Dropdown
    const toggleProfile = () => {
      setIsProfileVisible(!isProfileVisible);
      setIsNotificationVisible(false);  // Close notifications when profile is toggled
    };
  
  return (
    <header className="headdash">
        <Link to="/">
                 <img src="logo.png" alt="MSU-IIT NMPC Logo"  className="logolan"/>
            </Link>
       
        <h2 className="dashh2">MSU-IIT National Multi-Purpose Cooperative</h2>
        <nav className="iconn">
            <Link to="/">
                <img src="Home.png" alt="MSU-IIT NMPC Logo" className="navicon1"/>
            </Link>
        {/* Notification Button */}
        <div className="notification-container">
          <button onClick={toggleNotifications} className="notification-button">
            <img src="Bell_pin.png" alt="Notifications" className="navicon" />
          </button>

          {/* Notifications Dropdown */}
          {isNotificationVisible && (
            <div className="notifications-dropdown">
              <h3>Notifications</h3>
              <ul className="notification-list">
                {notifications.map((notif, index) => (
                  <li key={index} className="notification-item">
                    <div className="notification-message">
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Button */}
        <div className="notification-container">
            <button onClick={toggleProfile} className="notification-button">
              <img src="User_circle.png" alt="User" className="navicon" />
            </button>

            {/* Profile Dropdown */}
            {isProfileVisible && (
              <div className="prof-dropdown">
                <Link to="/borrowerdash" className="profile-link">My Profile</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>

            )}
          </div>

      </nav>
      <span></span>
    </header>
  );
};

export default BorrowerHeader;