import React from 'react';

const Watchlist = ({ watchlist, onRemoveFromWatchlist }) => {
  return (
    <div>
      <div>
        {watchlist.map((movie) => (
          <div key={movie.movieId}>
            <h3>{movie.movieName}</h3>
            <button onClick={() => onRemoveFromWatchlist(movie.movieId)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;



