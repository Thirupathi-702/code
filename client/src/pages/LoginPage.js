import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function LoginPage() {
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

  return (
    <div className="login-container">
      <h1>Login to Stock Market App</h1>
      <GoogleOAuthProvider clientId="890279554489-pmkaisons71kk5fkou43jtniuqf0ddf4.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginPage;
