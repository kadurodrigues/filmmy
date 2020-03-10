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
  const { state: { user, shouldOpenUserListsDialog, isLogged }, dispatch } = useStore();
  const { movie } = useFetchMovie(movieId);
  
  const handleOpenDialog = () => {
    return user !== null ? dispatch(setUserListsDialog(true)) : setOpenLogin(true)
  }

  // const handleCloseLogin = ({ isLogged }) => {
  //   return isLogged ? dispatch(setUserListsDialog(true)) : setOpenLogin(false);
  // }

  return (
    <>
      <Link to="/">Back</Link>
      {movie && <h2>{movie.title}</h2>}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Movie
      </Button>
      {!isLogged && <Auth open={openLogin} />}
      {isLogged && 
        <UserLists 
          open={true} 
          movieSelected={movie} 
          onClose={() => dispatch(setUserListsDialog(false))} 
        />
      }
      {/* {openLogin && <Auth open={openLogin} onClose={event => handleCloseLogin(event)} />}
      {shouldOpenUserListsDialog && 
        <UserLists 
          open={shouldOpenUserListsDialog} 
          movieSelected={movie} 
          onClose={() => dispatch(setUserListsDialog(false))} 
        />
      } */}
    </>
  )
}

export default Movie;