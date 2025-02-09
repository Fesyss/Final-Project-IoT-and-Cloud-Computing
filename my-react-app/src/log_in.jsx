import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './log_in.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LogIn = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      // Make a POST request to backend
      const response = await fetch(`${API_BASE_URL}/logIn`, {  // Using ENV variable
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        setError(null); 
        setSuccess('Login successful!'); 
        console.log('Login successful:', data);
        navigate('/UserManagement');

        // Store JWT token in localStorage (optional)
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
      } else {
        setSuccess(null); 
        setError(data.message || 'Invalid email or password'); 
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again.');
      setSuccess(null); 
    }
  };

  return (
    <div className="login-container">
      <h1>Log in to your account</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>} 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
            placeholder="Password"
          />
        </div>
        <div className='submit-button-wrapper'>
          <button type="submit" className="login-button">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;