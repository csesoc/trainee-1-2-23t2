import styled from 'styled-components'
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || { from: "/" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    localStorage.setItem('loggedInUser', username);
    navigate(from);
  };
  return (
    <>
      <div className="login-container">
        <h2>Login (Style this at some point lmao)</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username or Email:</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage;