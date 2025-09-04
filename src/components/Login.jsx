import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get all users from db.json
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        alert('Failed to fetch users. Please try again later.');
        return;
      }
      const users = await response.json();
      
      // Check if user exists
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Create a session (optional)
        const sessionResponse = await fetch('http://localhost:3001/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            loginTime: new Date().toISOString()
          }),
        });
        
        if (sessionResponse.ok) {
          console.log('Login successful');
          alert('Login successful!');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;