import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#FF6B6B',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginLeft: '10px'
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
