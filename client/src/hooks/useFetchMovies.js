import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const { data: { results } } = await axios.get(`${BASE_URL}/movies/discover`);
      setMovies(results);
    }

    fetchMovies();
  }, [])

  return {
    movies
  }
}

export default useFetchMovies;