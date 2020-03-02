import { useState, useEffect } from 'react';
import api from '../services/api';

const useFetchMovie = movieId => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const { data } = await api.get(`/movie/${movieId}`);
      setMovie(data);
    }

    fetchMovie();
  }, [movieId])

  return {
    movie
  }
}

export default useFetchMovie;