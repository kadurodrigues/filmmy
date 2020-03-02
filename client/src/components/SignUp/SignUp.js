import React, { useState }  from 'react';
import { 
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';
import { useFormStyles } from '../../styles/globalStyles';

function SignUp({ onSignUp, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useFormStyles();

  return (
    <>
      <DialogContent>
        <TextField
          autoFocus
          id="firstName"
          label="First Name"
          type="text"
          variant="outlined"
          className={classes.textField}
          fullWidth
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          id="lastName"
          label="Last Name"
          type="text"
          variant="outlined"
          className={classes.textField}
          fullWidth
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
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
        <Button
          color="primary"
          variant="contained" 
          onClick={() => onSignUp({ 
            firstName,
            lastName,
            email, 
            password 
          })}>
          Sign Up
        </Button>
      </DialogActions>
    </>
  )
}

export default SignUp;