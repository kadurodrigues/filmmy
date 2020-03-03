import React, { useState } from 'react';
import Alert from '../Alert';

import { 
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';
import { useFormStyles, useDialogStyles } from '../../styles/globalStyles';

function SignIn({ onSignIn, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordInvalid, setPasswordInvalid] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  
  const classes = useFormStyles();
  const dialogClasses = useDialogStyles();

  const onEmailChange = (event) => {
    if (event.target.value === '') {
      setEmailInvalid(true);
      setEmailErrorMessage('Email address is required')
    } else {
      setEmailInvalid(false);
      setEmailErrorMessage('');
      setEmail(event.target.value)
    }
  }

  const onPasswordChange = (event) => {
    if (event.target.value === '') {
      setPasswordInvalid(true);
      setPasswordErrorMessage('Password is required')
    } else {
      setPasswordInvalid(false);
      setPasswordErrorMessage('');
      setPassword(event.target.value)
    }
  }

  const handleSignIn = () => {
    if (email === '' || password === '' || isEmailInvalid || isPasswordInvalid) {
      setError(true)
    } else {
      onSignIn({ email, password })
    }
  }

  return (
    <>
      <DialogContent>
        <DialogContentText className={dialogClasses.dialogContentText}>
          Sign in to your account
        </DialogContentText>
        <form noValidate autoComplete="off">
          <TextField
            required
            autoFocus
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            className={classes.textField}
            helperText={emailErrorMessage}
            error={isEmailInvalid}
            fullWidth
            onChange={onEmailChange}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            className={classes.textField}
            helperText={passwordErrorMessage}
            error={isPasswordInvalid}
            fullWidth
            onChange={onPasswordChange}
          />
        </form>
        { isError &&  
          <Alert
            message="Please provide a valid email and password." 
            severity="error" 
            onClose={() => setError(false)} 
          /> 
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignIn} variant="contained" color="primary">
          Sign In
        </Button>
      </DialogActions>
    </>
  )
}

export default SignIn;