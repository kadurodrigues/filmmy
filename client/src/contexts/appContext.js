import React from 'react';
import MoviesContext from './moviesContext';

function AppContext({ children }) {
  return (
    <MoviesContext>
      { children }
    </MoviesContext>
  )
}

export default AppContext;