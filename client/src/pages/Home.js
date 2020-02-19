import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../components/List';

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get('http://localhost:3000/api/movies/discover');
      setMovies(data.results);
    }
    fetchMovies();
  }, []);

  return(
    <>
      <h2>Discover</h2>
      <List movies={movies} />
    </>
  );
}

export default Home;