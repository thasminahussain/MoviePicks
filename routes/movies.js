import express from "express";
import axios from "axios";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";
import dotenv from "dotenv";
dotenv.config();

const router = new express.Router();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// // fetch and store popular movies in the database
// router.get('/popular', async (req, res) => {
//     try {
//         const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
//         const moviesFromAPI = response.data.results.map(movie => ({
//             tmdb_id: movie.id,
//             title: movie.title,
//             overview: movie.overview,
//             posterPath: movie.poster_path,
//             releaseDate: movie.release_date,
//             averageRating: movie.vote_average
//         }));

//         // Check which movies are already in the database
//         const existingMovies = await Movie.find({ tmdb_id: { $in: moviesFromAPI.map(movie => movie.tmdb_id) } });
//         const existingMovieIds = existingMovies.map(movie => movie.tmdb_id);

//         // Filter out movies that are already in the database
//         const moviesToAdd = moviesFromAPI.filter(movie => !existingMovieIds.includes(movie.tmdb_id));

//         // Insert new movies into the database
//         if (moviesToAdd.length > 0) {
//             const result = await Movie.insertMany(moviesToAdd);
//             console.log('New movies saved successfully:', result);
//         } else {
//             console.log('No new movies to add.');
//         }

//         res.send(moviesFromAPI);
//     } catch (error) {
//         console.error('Error saving movies to database:', error);
//         res.status(500).send(`Server Error: ${error.message}`);
//     }
// });

// // fetch movie by id and store in database
// router.get("/:id", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${TMDB_API_KEY}&language=en-US`
//     );
//     const movieData = response.data;

//     const movie = {
//       tmdb_id: movieData.id,
//       title: movieData.title,
//       overview: movieData.overview,
//       posterPath: movieData.poster_path,
//       releaseDate: movieData.release_date,
//       averageRating: movieData.vote_average,
//     };

//     // const newMovie = new Movie(movie);
//     // const addMovieResult = await Movie.create(newMovie);

//     res.send(movie);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });


// fetch movie by name and store in database
router.get("/search/:name", async (req, res) => {
  try {
    const searchTerm = req.params.name;

    // Check if the movie exists in the database
    const existingMovie = await Movie.findOne({ title: searchTerm });

    if (existingMovie) {
      // If the movie exists in the database, return it to the user
      console.log("Movie found in the database:");
      res.send([existingMovie]);
    } else {
      // If the movie does not exist in the database, fetch it from the API
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          searchTerm
        )}&language=en-US&page=1`
      );

      const moviesFromAPI = response.data.results.map((movie) => ({
        tmdb_id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        averageRating: movie.vote_average,
      }));

      // Filter movies to insert only those with an overview
      const moviesToAdd = moviesFromAPI.filter(movie => movie.overview);

      // Check for existing movies by tmdb_id
      const existingMovieIds = await Movie.distinct('tmdb_id', { tmdb_id: { $in: moviesToAdd.map(movie => movie.tmdb_id) } });

      // Filter out movies that are already in the database
      const newMovies = moviesToAdd.filter(movie => !existingMovieIds.includes(movie.tmdb_id));

      // Insert new movies into the database
      if (newMovies.length > 0) {
        const result = await Movie.insertMany(newMovies);
        console.log("New movies saved successfully:");
      }

      res.send(newMovies);
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// Leave a review for a movie
router.post("/:id/review", async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if movie exists, if not fetch and store it
    let movie = await Movie.findOne({ tmdb_id: req.params.id });
    if (!movie) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${TMDB_API_KEY}`
      );
      const movieData = response.data;
      movie = new Movie({
        tmdb_id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        posterPath: movieData.poster_path,
        releaseDate: movieData.release_date,
        averageRating: movieData.vote_average,
      });
      await movie.save();
    }

    // Create new review
    const newReview = await Review.create({
      user: userId,
      movie: movie._id,
      title: movie.title,
      rating,
      comment,
    });

    // Add review to movie's reviews array
    movie.reviews.push(newReview._id);
    await movie.save();

    res.status(201).send(newReview);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// Get all reviews for a movie
router.get("/:id/reviews", async (req, res) => {
  try {
    const movie = await Movie.findOne({ tmdb_id: req.params.id }).populate('reviews');
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    res.send(movie.reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a single review
router.get("/review/:reviewId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId).populate('user').populate('movie');
    if (!review) {
      return res.status(404).send("Review not found");
    }
    res.send(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update a review
router.put("/review/:reviewId", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    let review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).send("Review not found");
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.send(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


// Delete Review
router.delete("/review/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Remove the review
    await Review.findByIdAndDelete(reviewId);

    const movie = await Movie.findById(review.movie);
    if (movie) {
      movie.reviews = movie.reviews.filter(r => r.toString() !== reviewId);
      await movie.save();
    }

    res.json({ msg: "Review removed" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});


// Add to watchlist by using tmdb_id
router.post('/:userId/watchlist/:tmdbId', async (req, res) => {
  try {
    const { userId, tmdbId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if movie exists in the database
    let movie = await Movie.findOne({ tmdb_id: tmdbId });
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // Check if movie already exists in user's watchlist
    const isMovieInWatchlist = user.watchlist.some(item => item.movieId.equals(movie._id));
    if (isMovieInWatchlist) {
      return res.status(400).send('Movie already in watchlist');
    }

    // Add movie to user's watchlist
    user.watchlist.push({
      movieId: movie._id,
      movieName: movie.title,
    });
    await user.save();

    res.status(201).send(user.watchlist);
  } catch (error) {
    console.error('Error adding movie to watchlist:', error.message);
    res.status(500).send('Server Error');
  }
});

// Delete from watchlist
router.delete('/:userId/watchlist/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the movie exists in the user's watchlist
    const movieIndex = user.watchlist.findIndex(item => item.movieId.toString() === movieId);
    if (movieIndex === -1) {
      return res.status(404).send('Movie not found in watchlist');
    }

    // Remove the movie from the watchlist
    user.watchlist.splice(movieIndex, 1);
    await user.save();

    res.status(200).send(user.watchlist);
  } catch (error) {
    console.error('Error removing movie from watchlist:', error.message);
    res.status(500).send('Server Error');
  }
});

export default router;
