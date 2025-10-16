import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      textAlign: 'center'
    }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `4px solid #f3f3f3`,
          borderTop: `4px solid #007bff`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}
      />
      <p style={{ color: '#666', margin: 0 }}>{text}</p>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;