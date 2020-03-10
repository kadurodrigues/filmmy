import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Auth from '../../components/Auth';
import UserLists from '../../components/UserLists';
import { useStore } from '../../store';
import useFetchMovie from '../../hooks/useFetchMovie';
import { setUserListsDialog } from '../../actions';

function Movie() {
  const [openLogin, setOpenLogin] = useState(false);
  const { state: { movieId } } = useLocation();
  const { state: { user, shouldOpenUserListsDialog }, dispatch } = useStore();
  const { movie } = useFetchMovie(movieId);
  
  const handleAddMovie = () => {
    return user ? dispatch(setUserListsDialog(true)) : setOpenLogin(true)
  }

  const handleAuthDialog = ({ isLogged }) => {
    return isLogged ? handleUserLogged() : setOpenLogin(false)
  }

  const handleUserLogged = () => {
    setOpenLogin(false);
    dispatch(setUserListsDialog(true));
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
          onClose={() => dispatch(setUserListsDialog(false))} 
        />
      }
    </>
  )
}

export default Movie;