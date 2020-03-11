import React, { useState, useEffect } from 'react';
import {
  AppBar,
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
import ProgressButton from '../ProgressButton';
import Alert from '../Alert';

import { useDialogStyles } from '../../styles/globalStyles';
import { useStore } from '../../store';
import useFetchData from '../../hooks/useFetchData';
import useAddMovie from '../../hooks/useAddMovie';

function UserLists({ movieSelected, open, onClose }) {
  const { state: { lists, user } } = useStore();
  const [listIndex, setListIndex] = useState(0);
  const [listSelected, setListSelected] = useState('');
  const [movieData, setMovieData] = useState({});
  const [{ isAddingMovie }, addMovie] = useAddMovie({ payload: movieData })
  const [{ isFetchingList }, getUserLists] = useFetchData();
  const [error, setError] = useState({ 
    show: false, 
    message: ''
  });

  useEffect(() => {
    getUserLists();

  }, [getUserLists]);

  const classes = useDialogStyles();

  const handleListSelected = (listId, index) => {
    setError({ show: false })
    setListIndex(index);
    setListSelected(listId);
    setMovieData({
      listId,
      userId: user._id,
      movie: movieSelected
    })
  }

  const handleAddMovie = () => {
    if (listSelected === '') {
      setError({ show: true, message: 'First, select a list.' });
    } else {
      addMovie();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <AppBar position="static" color="primary">
        <DialogTitle id="form-dialog-title">Select a List:</DialogTitle>
      </AppBar>
      <DialogContent className={classes.dialogContent}>
        {error.show && 
        <Alert 
          severity="warning" 
          message={error.message} 
          onClose={() => setError({ show: false })} />
        }
        {isFetchingList 
          ? <Spinner /> 
          : <List component="nav" aria-label="user movies list">
            {lists.length ? lists.map(({ _id, name, movies }, index) => (
              <ListItem
                key={_id}
                button
                selected={listIndex === index}
                onClick={() => handleListSelected(_id, index)}
              >
                <ListItemIcon>
                  <Movie />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  secondary={`Total Movies: ${movies.length}`}
                />
              </ListItem>
            )) : null}
          </List>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <ProgressButton label="Add Movie" isDisabled={isAddingMovie} onClick={handleAddMovie} />
      </DialogActions>
    </Dialog>
  )
}

export default UserLists;