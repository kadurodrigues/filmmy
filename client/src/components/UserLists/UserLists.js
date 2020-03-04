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

import Spinner from '../Spinner';
import Alert from '../Alert';

import useFetchUserLists from '../../hooks/useFetchUserLists';
import { useDialogStyles } from '../../styles/globalStyles';
import { useStore } from '../../store';

function UserLists({ open, onClose }) {
  const [listIndex, setListIndex] = useState(0);
  const { state: { lists } } = useStore();

  const {  
    isLoading, 
    hasRequestFailed, 
    setHasRequestFailed,
    errorMessage 
  } = useFetchUserLists();

  const classes = useDialogStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">My Lists</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isLoading && <Spinner />}
        {hasRequestFailed && <Alert severity="error" message={errorMessage} onClose={() => setHasRequestFailed(false)} />}
        <List component="nav" aria-label="user movies list">
          {lists.length ? lists.map(({ _id, name }, index) => (
            <ListItem
              key={_id}
              button
              selected={listIndex === index}
              onClick={() => setListIndex(index)}
            >
              <ListItemText primary={name} />
            </ListItem>
          )) : null}
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