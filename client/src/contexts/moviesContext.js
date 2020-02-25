import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/constants';

export const MoviesContext = createContext();

function Movies({ children }) {
  const [movies, setMovies] = useState([]);
  const { data: { results } } = useFetch(`${BASE_URL}/movies/discover`);

  useEffect(() => {
    setMovies(results)
  }, [results])

  return (
    <MoviesContext.Provider value={{
      movies
    }}>
      { children }
    </MoviesContext.Provider>
  )
}

export default Movies;