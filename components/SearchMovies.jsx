import React, { useState } from 'react';
import { searchMovies } from '../src/api';

const SearchMovies = ({ onAddToWatchlist }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearchMovies = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie) => (
          <div key={movie.tmdb_id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <button onClick={() => onAddToWatchlist(movie)}>Add to Watchlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;







