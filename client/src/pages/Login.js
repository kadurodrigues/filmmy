import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { SET_USER } from '../actions';
import { useStore } from '../store';
 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useStore();
    
  const handleLogin = async () => {
    try {  
      const { 
        data: { user } 
      } = await axios.post(`${BASE_URL}/auth`, { email, password });

      dispatch({ type: SET_USER, payload: user });
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Login Page</h2>
      <form>
        <label>Email:</label>
        <input 
          type="text" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
        />
        <label>password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  )
}

export default Login;