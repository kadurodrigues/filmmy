import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import Button from '@material-ui/core/Button';
import Login from '../../components/Login';
import UserLists from '../../components/UserLists';
import { useStore } from '../../store';

function Movie() {
  const [movie, setMovie] = useState({});
  const [openLogin, setOpenLogin] = useState(false);
  const [openUserLists, setOpenUserLists] = useState(false);
  
  const { state: { movieId } } = useLocation();
  const { state: { user } } = useStore();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [movieId]);

  const handleOpenDialog = () => {
    return user !== null ? setOpenUserLists(true) : setOpenLogin(true)
  }

  const handleCloseLogin = () => {
    setOpenLogin(false);
  }

  const handleCloseUserLists = () => {
    setOpenUserLists(false);
  }

  return (
    <>
      <Link to="/">Back</Link>
      <h2>{movie.title}</h2>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Movie
      </Button>
      <Login open={openLogin} onClose={handleCloseLogin} />
      <UserLists open={openUserLists} onClose={handleCloseUserLists} />
    </>
  )
}

export default Movie;