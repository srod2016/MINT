import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear errors

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });

      const data = await response.json();

      if (data.success) {
        // Save ID to "session" (local storage)
        localStorage.setItem('userId', data.userId);
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Server is offline');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 style={{ color: '#2699FB', fontSize: '48px', margin: '0 0 10px 0' }}>MINT</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Money Income Networth Tracker</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username (Try: student)" 
            className="mint-input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password (Try: pass123)" 
            className="mint-input" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          
          {error && <div style={{color:'red', fontSize:'12px', marginBottom:'10px'}}>{error}</div>}

          <button type="submit" className="mint-btn">LOGIN</button>
        </form>
        
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
          Database Connection: <span style={{ color: '#10B981', fontWeight:'bold' }}>Active</span>
        </p>
      </div>
    </div>
  );
};

export default Login;