import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const [idToken, setIdToken] = React.useState<any>(null);

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const claims = await getIdTokenClaims();
        setIdToken(claims);
      } catch (error) {
        console.error('Error getting ID token claims:', error);
      }
    };

    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated, getIdTokenClaims]);

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
      
      {/* Display custom metadata from JWT */}
      {idToken && (
        <div style={{ 
          marginTop: '20px', 
          backgroundColor: '#e8f4fd', 
          padding: '15px', 
          borderRadius: '6px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>Custom Metadata from JWT</h4>
          
          {/* SMS ID from custom claim */}
          {idToken['https://stake.alluvial.finance/user_metadata']?.sms_id && (
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>SMS ID:</strong> {idToken['https://stake.alluvial.finance/user_metadata'].sms_id}
            </p>
          )}
          
          {/* Full user_metadata from custom claim */}
          {idToken['https://stake.alluvial.finance/user_metadata'] && (
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>All User Metadata</summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                color: '#333',
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                marginTop: '5px',
                overflow: 'auto'
              }}>
                {JSON.stringify(idToken['https://stake.alluvial.finance/user_metadata'], null, 2)}
              </pre>
            </details>
          )}
          
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#666' }}>Full JWT Claims (Debug)</summary>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              color: '#333',
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '11px',
              marginTop: '5px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {JSON.stringify(idToken, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Profile;
