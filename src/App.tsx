import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Loading from './components/Loading';
import ApiTester from './components/ApiTester';
import './App.css';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ marginBottom: '30px' }}>Auth0 React Demo</h1>
        
        {!isAuthenticated ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '18px', marginBottom: '30px' }}>
              Welcome! Please log in to access your profile.
            </p>
            <LoginButton />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              Welcome back! You are successfully authenticated.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <LogoutButton />
            </div>
            <Profile />
            <ApiTester />
          </div>
        )}
        
        <div style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>
          <p>This is a simple React SPA with Auth0 authentication</p>
        </div>
      </header>
    </div>
  );
}

export default App;
