import React, { useState } from 'react';
import { setUserStore } from '../../actions';
import { useStore } from '../../store';
import useSessionStorage from '../../hooks/useSessionStorage';
import api from '../../services/api';
import SingIn from '../SignIn';
import SignUp from '../SignUp';

import { AppBar, Dialog, Tabs, Tab } from '@material-ui/core';

function Login({ open, onClose }) {
  const [tabValue, setTabValue] = useState(0);
  const [, setToken ] = useSessionStorage('token', '');
  const [, setUser ] = useSessionStorage('user', '');
  const { dispatch } = useStore();
    
  const handleOnSignIn = async ({ email, password }) => {
    try {  
      const { 
        data: { user, token } 
      } = await api.get('/auth', { email, password });
      
      setToken(token);
      setUser({ _id: user._id, firstName: user.firstName });
      dispatch(setUserStore({_id: user._id, firstName: user.firstName }));
      onClose(user);

    } catch (error) {
      console.log(error);
    }
  }

  const handleOnSignUp = async ({ firstName, lastName, email, password }) => {
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <AppBar position="static" color="primary">
        <Tabs 
          value={tabValue} 
          onChange={(event, newValue) => setTabValue(newValue)} 
          aria-label="Authentication Tabs"
          variant="fullWidth">
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </AppBar>
      {tabValue === 0 ? (
        <SingIn onSignIn={handleOnSignIn} onClose={onClose} />
      ) : (
        <SignUp onSignUp={handleOnSignUp} onClose={onClose} />
      )}
    </Dialog>
  )
}

export default Login;