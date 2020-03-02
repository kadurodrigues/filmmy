import React, { useState } from 'react';
import { setUserStore } from '../../actions';
import { useStore } from '../../store';
import useSessionStorage from '../../hooks/useSessionStorage';
import api from '../../services/api';
import SingIn from '../SignIn';
import SignUp from '../SignUp';
import Alert from '../Alert';

import { AppBar, Dialog, Tabs, Tab } from '@material-ui/core';
import { ALERT_MSG } from '../../utils/constants';

function Login({ open, onClose }) {
  const [tabValue, setTabValue] = useState(0);
  const [isError, setError] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [, setToken ] = useSessionStorage('token', '');
  const [, setUser ] = useSessionStorage('user', '');
  const { dispatch } = useStore();
    
  const handleOnSignIn = async ({ email, password }) => {
    try {  
      const { 
        data: { user, token } 
      } = await api.post('/auth', { email, password });
      
      setToken(token);
      setUser({ _id: user._id, firstName: user.firstName });
      dispatch(setUserStore({_id: user._id, firstName: user.firstName }));
      onClose({ isLogged: true });

    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage(ALERT_MSG.authFailed);
      setError(true);
    }
  }

  const handleOnSignUp = async ({ firstName, lastName, email, password }) => {
    onClose();
  }

  const handleOnCloseDialog = () => {
    setError(false);
    onClose({ isLogged: false });
  }

  return (
    <Dialog open={open} onClose={handleOnCloseDialog} aria-labelledby="form-dialog-title">
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
      { isError &&  
        <Alert
          message={alertMessage} 
          severity={alertSeverity} 
          onClose={() => setError(false)} 
        /> 
      }
      {tabValue === 0 ? (
        <SingIn onSignIn={handleOnSignIn} onClose={handleOnCloseDialog} />
      ) : (
        <SignUp onSignUp={handleOnSignUp} onClose={onClose} />
      )}
    </Dialog>
  )
}

export default Login;