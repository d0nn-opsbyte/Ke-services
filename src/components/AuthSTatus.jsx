import React from 'react';

const AuthStatus = ({ formData, authState }) => {
  return (
    <div style={{
      padding: '20px',
      margin: '20px auto',
      maxWidth: '500px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Authentication Status</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Form Submission Data:</h4>
        <pre style={{
          backgroundColor: '#eee',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Current Auth State:</h4>
        <pre style={{
          backgroundColor: '#eee',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
          {JSON.stringify(authState, null, 2)}
        </pre>
      </div>
      
      <div>
        <h4>Next Steps:</h4>
        <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
          <li>Check if JSON Server is running on port 3001</li>
          <li>Verify the API endpoint: http://localhost:3001/users</li>
          <li>Ensure CORS is enabled if needed</li>
          <li>Check browser console for any errors</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthStatus;