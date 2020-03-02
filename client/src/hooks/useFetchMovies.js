import { useState, useEffect } from 'react';
import api from '../services/api';

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const { data: { results } } = await api.get('/movies/discover');
      setMovies(results);
    }

    fetchMovies();
  }, [])

  return {
    movies
  }
}

export default useFetchMovies;