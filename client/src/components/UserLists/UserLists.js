import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core';

function UserLists({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">My Lists</DialogTitle>
      <DialogContent> 
        <ul>
          <li>List One</li>
          <li>List Two</li>
          <li>List Three</li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserLists;