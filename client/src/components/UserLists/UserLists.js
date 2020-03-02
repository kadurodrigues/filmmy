import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core';

function UserLists({ open, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">My Lists</DialogTitle>
      <DialogContent> 
        <List component="nav" aria-label="user movies list">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemText primary="List One" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemText primary="List Two" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemText primary="List Three" />
          </ListItem>
        </List>
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