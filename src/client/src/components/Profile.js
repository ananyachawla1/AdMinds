// src/components/Profile.js
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
};

export default Profile;
