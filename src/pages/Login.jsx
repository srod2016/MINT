import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirects to the Dashboard (Home)
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 style={{ color: '#2699FB', fontSize: '48px', margin: '0 0 10px 0' }}>MINT</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Money Income Networth Tracker</p>
        
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" className="mint-input" defaultValue="Student" />
          <input type="password" placeholder="Password" className="mint-input" defaultValue="password" />
          <button type="submit" className="mint-btn">LOGIN</button>
        </form>
        
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
          or <span style={{ color: '#2699FB', cursor: 'pointer' }}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;