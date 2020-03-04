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

import { useStore } from '../../store';
import useFetchUserLists from '../../hooks/useFetchUserLists';
import { useDialogStyles } from '../../styles/globalStyles';

function UserLists({ open, onClose }) {
  const { state: { user } } = useStore();
  const [listIndex, setListIndex] = useState(0);
  const { lists, isLoading, hasRequestFailed, setHasRequestFailed } = useFetchUserLists(user._id);
  const classes = useDialogStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">My Lists</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isLoading && <Spinner />}
        {hasRequestFailed && <Alert severity="error" message="Failed to access your lists" onClose={() => setHasRequestFailed(false)} />}
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