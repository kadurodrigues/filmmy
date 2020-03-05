import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button
} from '@material-ui/core';
import { Movie } from '@material-ui/icons';

import Spinner from '../Spinner';
import Alert from '../Alert';

import useFetchUserLists from '../../hooks/useFetchUserLists';
import { useDialogStyles } from '../../styles/globalStyles';
import { useStore } from '../../store';
import useFetchData from '../../hooks/useFetchData';

function UserLists({ movieSelected, open, onClose }) {
  const [listIndex, setListIndex] = useState(0);
  const [listSelected, setListSelected] = useState('');
  // const { state: { lists } } = useStore();
  // const {
  //   isLoading,
  //   hasRequestFailed,
  //   setHasRequestFailed, 
  //   errorMessage
  // } = useFetchUserLists();

  const { state: { user } } = useStore();
  const [{ data, isLoading, error }, callAPI] = useFetchData({
    url: `/lists/${user._id}`,
    headerOptions: { headers: { 'authorization': 'Bearer ast8fazd777ashbsdf787' } }
  });

  console.log(data);

  useEffect(() => {
    callAPI();
  }, []);


  const classes = useDialogStyles();

  const handleListSelected = (listId, index) => {
    setListIndex(index);
    setListSelected(listId);
  }

  const handleAddMovieList = () => {
    callAPI();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select a List:</DialogTitle>
      {/* <DialogContent className={classes.dialogContent}>
        {isLoading && <Spinner />}
        {hasRequestFailed && <Alert severity="error" message={error} onClose={() => setHasRequestFailed(false)} />}
        <List component="nav" aria-label="user movies list">
          {lists.length ? lists.map(({ _id, name }, index) => (
            <ListItem
              key={_id}
              button
              selected={listIndex === index}
              onClick={() => handleListSelected(_id, index)}
            >
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          )) : null}
        </List>
      </DialogContent> */}
      <DialogContent className={classes.dialogContent}>
        {isLoading && <Spinner />}
        {error && <Alert severity="error" message={error} onClose={() => null} />}
        <List component="nav" aria-label="user movies list">
          {data !== null && data.lists.map(({ _id, name }, index) => (
            <ListItem
              key={_id}
              button
              selected={listIndex === index}
              onClick={() => handleListSelected(_id, index)}
            >
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddMovieList} color="primary">
          Add Movie
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserLists;