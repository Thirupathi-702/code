import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const handleLoginSuccess = async (response) => {
    console.log('Login Success:', response);

    try {
      const res = await axios.post('https://backend-hoac.onrender.com/api/auth/google', {
        token: response.credential,
      });

      // Save the JWT token in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect the user to the home page or dashboard
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
    alert('Login failed, please try again.');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('https://backend-hoac.onrender.com/auth/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location = "/todos";
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          New here? <Link to="/signup">Signup</Link>
        </p>
        <div className="google-login">
          <GoogleOAuthProvider clientId="890279554489-pmkaisons71kk5fkou43jtniuqf0ddf4.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
