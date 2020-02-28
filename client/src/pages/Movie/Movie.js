import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import Button from '@material-ui/core/Button';
import DialogForm from '../../components/Dialog';

function Movie() {
  const [movie, setMovie] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { state: { movieId } } = useLocation();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`${BASE_URL}/movies/${movieId}`);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [movieId]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  }

  return (
    <>
      <Link to="/">
        Back
      </Link>
      <h2>{movie.title}</h2>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Movie</Button>
      { openDialog && <DialogForm /> }
    </>
  )
}

export default Movie;