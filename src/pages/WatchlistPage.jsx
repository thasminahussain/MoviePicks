import React, { useState, useEffect } from "react";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api";
import SearchMovies from "../../components/SearchMovies";
import Watchlist from "../../components/Watchlist";
import "../App.css";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  const userId = "66747ea424d354ae5ef183d4";

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist(userId);
        setWatchlist(watchlistData);
        localStorage.setItem("watchlist", JSON.stringify(watchlistData));
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [userId]);

  const handleAddToWatchlist = async (movie) => {
    try {
      const updatedWatchlist = await addToWatchlist(userId, movie.tmdb_id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      const updatedWatchlist = await removeFromWatchlist(userId, movieId);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <div className="watchlistPage">
      <h2 className="title">Browse Movies </h2>
      <div className="searchBar">
        <SearchMovies onAddToWatchlist={handleAddToWatchlist} />
      </div>
      <div className="watchlist">
        <h2>Watchlist</h2>
        <Watchlist
          watchlist={watchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
      </div>
    </div>
  );
};

export default WatchlistPage;
