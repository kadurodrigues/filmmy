import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { setUserStore } from '../../actions';
import { useStore } from '../../store';
import usePersistedState from '../../hooks/usePersistedState';
import { 
  Dialog,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  TextField,
  Button
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(1),
  },
}));

function TabPanel({ children, value, index }) {
  return (
    <>
      { value === index && <div>{children}</div>}
    </>
  );
}

function Login({ open, onClose }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [, setUserLocalStorage] = usePersistedState('user');
  const { dispatch } = useStore();
    
  const handleLogin = async () => {
    try {  
      const { 
        data: { user } 
      } = await axios.post(`${BASE_URL}/auth`, { email, password });

      dispatch(setUserStore(user));
      setUserLocalStorage(user);
      setEmail('');
      setPassword('');
      onClose();

    } catch (error) {
      console.log(error);
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        aria-label="Auth Tabs"
        variant="fullWidth" 
        indicatorColor="primary">
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <DialogContent>
          <TextField
            autoFocus
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            className={classes.textField}
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <DialogContent>
          <TextField
            autoFocus
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="filled"
            onChange={() => {}}
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="filled"
            onChange={() => {}}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="filled"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </TabPanel>
    </Dialog>
  )
}

export default Login;