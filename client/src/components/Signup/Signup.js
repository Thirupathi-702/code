import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from '../../store/authState'
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const response = await fetch("https://backend-hoac.onrender.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location = "/todos";
    } else {
      alert("Error while signing up");
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>Signup</h2>
        <input 
          type='text' 
          placeholder='Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type='password' 
          placeholder='Password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSignup}>Signup</button>
        <p>
          Already signed up? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;
