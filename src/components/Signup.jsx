import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create user object
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        profile: {
          firstName: '',
          lastName: '',
          phone: '',
          location: ''
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Send POST request to JSON Server
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setMessage('Account created successfully!');
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'customer'
        });
      } else {
        setMessage('Error creating account. Please try again.');
      }
    } catch (error) {
      setMessage('Server error. Please make sure JSON Server is running.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      
      {message && <p style={{ 
        padding: '10px', 
        backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
        color: message.includes('success') ? '#155724' : '#721c24',
        borderRadius: '4px'
      }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>I am a: </label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
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
        
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;