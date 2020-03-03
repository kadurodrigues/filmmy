import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Auth from '../../components/Auth';
import UserLists from '../../components/UserLists';
import { useStore } from '../../store';
import useFetchMovie from '../../hooks/useFetchMovie';

function Movie() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openUserLists, setOpenUserLists] = useState(false);
  const { state: { movieId } } = useLocation();
  const { state: { user } } = useStore();
  const { movie } = useFetchMovie(movieId);

  const handleOpenDialog = () => {
    return user !== null ? setOpenUserLists(true) : setOpenLogin(true)
  }

  const handleCloseLogin = ({ isLogged }) => {
    if (isLogged) {
      setOpenUserLists(true);
    }
    setOpenLogin(false);
  }

  return (
    <>
      <Link to="/">Back</Link>
      { movie && <h2>{movie.title}</h2> }
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Movie
      </Button>
      <Auth open={openLogin} onClose={event => handleCloseLogin(event)} />
      <UserLists open={openUserLists} onClose={() => setOpenUserLists(false)} />
    </>
  )
}

export default Movie;