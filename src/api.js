import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/search/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const addToWatchlist = async (userId, movieId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/movies/${userId}/watchlist/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw error;
  }
};

export const removeFromWatchlist = async (userId, movieId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/movies/${userId}/watchlist/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw error;
  }
};

export const getWatchlist = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/watchlist`);
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
};
