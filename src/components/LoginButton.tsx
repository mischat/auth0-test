import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#635DFF',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '10px'
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
