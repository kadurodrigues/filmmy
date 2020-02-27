import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { setUserStore } from '../actions';
import { useStore } from '../store';
import usePersistedState from '../hooks/usePersistedState';
 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useStore();
  const [state, setUserLocalStorage] = usePersistedState('user');

  const handleClearForm = () => {
    setEmail('');
    setPassword('');
  }
    
  const handleLogin = async () => {
    try {  
      const { 
        data: { user } 
      } = await axios.post(`${BASE_URL}/auth`, { email, password });

      setUserLocalStorage(user);
      dispatch(setUserStore(user));
      handleClearForm();

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