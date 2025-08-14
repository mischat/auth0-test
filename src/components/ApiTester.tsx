import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ApiTester: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [smsId, setSmsId] = useState<string | null>(null);

  // Extract SMS ID from JWT claims on component mount
  React.useEffect(() => {
    const getSmsId = async () => {
      try {
        const claims = await getIdTokenClaims();
        const extractedSmsId = claims?.['https://stake.alluvial.finance/user_metadata']?.sms_id;
        setSmsId(extractedSmsId);
      } catch (error) {
        console.error('Error getting SMS ID from claims:', error);
      }
    };

    if (isAuthenticated) {
      getSmsId();
    }
  }, [isAuthenticated, getIdTokenClaims]);

  const callApi = async () => {
    if (!smsId) {
      setError('SMS ID not found in JWT claims');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Get the ID token (JWT)
      const claims = await getIdTokenClaims();
      const idToken = claims?.__raw; // The raw JWT token
      
      if (!idToken) {
        throw new Error('ID token not found');
      }
      
      // Make the API call to the authenticated endpoint
      const apiResponse = await fetch(`https://reporting.dev.alluvial.finance/v0/sms/${smsId}/rated/data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (!apiResponse.ok) {
        throw new Error(`API call failed: ${apiResponse.status} ${apiResponse.statusText}`);
      }

      const data = await apiResponse.json();
      setResponse(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('API call error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
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
      <h3>API Tester</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>SMS ID:</strong> {smsId || 'Not found in JWT claims'}</p>
        <p><strong>Endpoint:</strong> https://reporting.dev.alluvial.finance/v0/sms/{smsId || '{sms_id}'}/rated/data</p>
      </div>

      <button
        onClick={callApi}
        disabled={loading || !smsId}
        style={{
          padding: '10px 20px',
          backgroundColor: !smsId ? '#6c757d' : loading ? '#ffc107' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: !smsId ? 'not-allowed' : loading ? 'wait' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'Calling API...' : 'Call Authenticated API'}
      </button>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '15px',
          borderRadius: '4px',
          border: '1px solid #c3e6cb'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>API Response:</h4>
          <pre style={{
            backgroundColor: '#f8f9fa',
            color: '#333',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTester;
