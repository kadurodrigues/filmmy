import React, { useState } from 'react';
import { useFormStyles, useDialogStyles } from '../../styles/globalStyles';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core';

function CreateListDialog({ open, onCreateList, onClose }) {
  const classes = useFormStyles();
  const [listName, setListName] = useState('');
  const [error, setError] = useState({
    show: false,
    message: ''
  })

  const onInputChange = ({ target: { value } }) => {
    if (value === '') {
      setError({ show: true, message: 'The list name should not be empty.' });
    } else {
      setError({ show: false, message: '' });
      setListName(value);
    }
  }

  const handleCreateList = () => {
    if (listName === '') {
      setError({ show: true, message: 'The list name should not be empty.' })
    } else {
      onCreateList(listName)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <AppBar position="static" color="primary">
        <DialogTitle id="form-dialog-title">Create a List:</DialogTitle>
      </AppBar>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            required
            autoFocus
            label="List name"
            type="text"
            name="listName"
            variant="outlined"
            className={classes.textField}
            helperText={error.message}
            error={error.show}
            fullWidth
            onChange={onInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateList} variant="contained" color="primary">
          Create List
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateListDialog;