import React from 'react';
import './List.css';

function List({ movies, handleClick }) {
  return (
    <ul className="list">
      {movies.map((movie, index) => (
        <li className="list-item" key={index}>
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" />
          </div>
          <button 
            className="add-movie" 
            type="button"
            onClick={() => handleClick(movie.id)}
          >
            Add Movie
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List;