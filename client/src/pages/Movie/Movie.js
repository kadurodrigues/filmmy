import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Auth from '../../components/Auth';
import UserLists from '../../components/UserLists';
import SnackBar from '../../components/Snackbar';
import { useStore } from '../../store';
import useFetchMovie from '../../hooks/useFetchMovie';
import { setUserListsDialog, setCreateListsDialog } from '../../actions';
import CreateListDialog from '../../components/CreateListDialog';

function Movie() {
  const [openLogin, setOpenLogin] = useState(false);
  const { state: { movieId } } = useLocation();
  const { movie } = useFetchMovie(movieId);
  
  const { 
    state: { user, shouldOpenUserListsDialog, shouldOpenCreateListDialog, shouldOpenSnackbar }, 
    dispatch: { feedbackDispatch } 
  } = useStore();
  
  const handleAddMovie = () => {
    return user ? feedbackDispatch(setUserListsDialog(true)) : setOpenLogin(true)
  }

  const handleAuthDialog = ({ isLogged }) => {
    return isLogged ? handleUserLogged() : setOpenLogin(false)
  }

  const handleUserLogged = () => {
    setOpenLogin(false);
    feedbackDispatch(setUserListsDialog(true));
  }

  return (
    <>
      <Link to="/">Back</Link>
      {movie && <h2>{movie.title}</h2>}
      <Button variant="contained" color="primary" onClick={handleAddMovie}>
        Add Movie
      </Button>
      {openLogin && <Auth open={openLogin} onClose={handleAuthDialog} />}
      {shouldOpenUserListsDialog && 
        <UserLists 
          open={shouldOpenUserListsDialog} 
          movieSelected={movie} 
          onClose={() => feedbackDispatch(setUserListsDialog(false))} 
        />
      }
      { shouldOpenCreateListDialog && 
        <CreateListDialog 
          open={shouldOpenCreateListDialog}
          onClose={() => feedbackDispatch(setCreateListsDialog(false))} 
        />
      }
      { shouldOpenSnackbar && <SnackBar open={shouldOpenSnackbar} /> }
    </>
  )
}

export default Movie;