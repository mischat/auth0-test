import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      margin: '20px 0',
      textAlign: 'left'
    }}>
      <h2>User Profile</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        {user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              marginRight: '15px'
            }}
          />
        )}
        <div>
          <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
          <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
        </div>
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
        <p><strong>Last Updated:</strong> {user.updated_at}</p>
      </div>
    </div>
  );
};

export default Profile;
