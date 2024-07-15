import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("haai haai");
      
      const response = await axios.post('http://localhost:3000/user', { email, password });
console.log('vanno',response);

const userId = response.data.id; 
navigate(`/product/${userId}`); 

      // if (response.status === 200) {
      //   const userId = response.data.id; 
      //   navigate(`/product/${userId}`); 
      // } else {
      //   throw new Error('Login failed');
      // }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <input
          placeholder='Email'
            type="email"
            id="email"
            value={email}

            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
          placeholder='Password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
