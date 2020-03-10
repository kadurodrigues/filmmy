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
  Button,
  CircularProgress
} from '@material-ui/core';

import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Movie } from '@material-ui/icons';

import Spinner from '../Spinner';
import Alert from '../Alert';
import { useDialogStyles } from '../../styles/globalStyles';
import { useStore } from '../../store';
import useFetchData from '../../hooks/useFetchData';
import useAddMovie from '../../hooks/useAddMovie';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function UserLists({ movieSelected, open, onClose }) {
  const { state: { lists, user } } = useStore();
  const [listIndex, setListIndex] = useState(0);
  const [listSelected, setListSelected] = useState('');
  const [movieData, setMovieData] = useState({});
  const [{ isAddingMovie, isSuccess }, addMovie] = useAddMovie({ payload: movieData })
  const [{ isLoading, error }, getUserLists] = useFetchData();

  useEffect(() => {
    getUserLists();

  }, [getUserLists]);

  const classes = useDialogStyles();
  const buttonClasses = useStyles();

  const handleListSelected = (listId, index) => {
    setListIndex(index);
    setListSelected(listId);
    setMovieData({
      listId,
      userId: user._id,
      movie: movieSelected
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select a List:</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isLoading && <Spinner />}
        {error && <Alert severity="error" message={error} onClose={() => null} />}
        <List component="nav" aria-label="user movies list">
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
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <div className={buttonClasses.wrapper}>
          <Button 
            color="primary"
            disabled={isAddingMovie}
            onClick={() => addMovie()} >
            Add Movie
          </Button>
          {isAddingMovie && <CircularProgress size={14} className={buttonClasses.progress} />}
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default UserLists;