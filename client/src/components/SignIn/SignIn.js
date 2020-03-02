import React, { useState } from 'react';
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
  const classes = useFormStyles();
  const dialogClasses = useDialogStyles();

  return (
    <>
      <DialogContent>
        <DialogContentText className={dialogClasses.dialogContentText}>
          Sign in to your account
        </DialogContentText>
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
          variant="outlined"
          className={classes.textField}
          fullWidth
          onChange={(event) => setPassword(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSignIn({ email, password })} variant="contained" color="primary">
          Sign In
        </Button>
      </DialogActions>
    </>
  )
}

export default SignIn;