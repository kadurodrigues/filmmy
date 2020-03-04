import React, { useState } from 'react';
import Alert from '../Alert';
import { useFormStyles, useDialogStyles } from '../../styles/globalStyles';
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';

const messages = {
  email: 'Email address is required',
  password: 'Password is required'
}

function SignIn({ onSignIn, onClose }) {
  const [inputsValue, setInputsValue] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  });

  const [isInvalid, setInvalid] = useState({
    email: false,
    password: false
  });

  const [isError, setError] = useState(false);
  const classes = useFormStyles();
  const dialogClasses = useDialogStyles();

  const onInputChange = ({ target: { name, value } }) => {
    if (value === '') {
      setInvalid({ ...isInvalid, [name]: true });
      setErrorMessage({ ...errorMessage, [name]: messages[name] });
    } else {
      setInvalid({ ...isInvalid, [name]: false });
      setErrorMessage({ ...errorMessage, [name]: '' });
      setInputsValue({ ...inputsValue, [name]: value });
    }
  }

  const handleSignIn = () => {
    if (
      inputsValue.email === '' ||
      inputsValue.password === '' ||
      isInvalid.email ||
      isInvalid.password
    ) {
      setError(true)
    } else {
      onSignIn(inputsValue)
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
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            className={classes.textField}
            helperText={errorMessage.email}
            error={isInvalid.email}
            fullWidth
            onChange={onInputChange}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            className={classes.textField}
            helperText={errorMessage.password}
            error={isInvalid.password}
            fullWidth
            onChange={onInputChange}
          />
        </form>
        {isError &&
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