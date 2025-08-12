import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TokenDebug: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const handleGetTokens = async () => {
    try {
      // Get ID token (always JWT format)
      const idTokenClaims = await getIdTokenClaims();
      console.log('ID Token Claims:', idTokenClaims);
      
      // Get access token (may be opaque or JWT depending on setup)
      const accessToken = await getAccessTokenSilently();
      console.log('Access Token:', accessToken);
      console.log('Access Token parts:', accessToken.split('.').length);
      
      // Check if access token looks like JWT (3 parts)
      if (accessToken.split('.').length === 3) {
        console.log('✅ Access token is JWT format');
      } else {
        console.log('❌ Access token is opaque (not JWT)');
      }
    } catch (error) {
      console.error('Error getting tokens:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <button 
        onClick={handleGetTokens}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Debug Tokens (Check Console)
      </button>
    </div>
  );
};

export default TokenDebug;
