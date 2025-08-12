import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      fontSize: '18px'
    }}>
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
