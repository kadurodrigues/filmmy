import React, { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContext'
import List from '../components/List';

function Home() {
  const { movies } = useContext(MoviesContext);
  return(
    <>
      <h2>Discover</h2>
      { movies !== undefined && <List movies={movies} /> }
    </>
  );
}

export default Home;