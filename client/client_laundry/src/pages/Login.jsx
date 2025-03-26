import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("User logged in:", email);
    navigate('/');
  };

  return (
    <div className="auth-container">
        <div className="small-container">
        <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
     
    </div>
  );
}

export default Login;
