import React from 'react';
import List from '../../components/List';
import useFetchMovies from '../../hooks/useFetchMovies';

function Home() {
  const { movies } = useFetchMovies();

  const handleMovieSelected = (movieID) => {
    console.log('movie selected', movieID)
  }

  return(
    <>
      <h2>Home</h2>
      <List movies={movies} handleClick={handleMovieSelected} />
    </>
  );
}

export default Home;