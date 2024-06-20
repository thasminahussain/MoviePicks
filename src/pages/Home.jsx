import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/MoviePicksLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="MoviePicks Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </div>
      </nav>

      <header className="intro">
        <div className="intro-content">
          <h1>Welcome to MoviePicks!</h1>
          <p>Discover movies, read reviews, and build your watchlist.</p>
          <Link to="/signUp" className="primarybtn"> Get Started </Link>
        </div>
      </header>

      <section id="features">
        <div className="container">
          <h1>Features</h1>

          <div className="features-wrapper">
            <div className="feature">
              <FontAwesomeIcon icon={faStar} className="icon-star" />
              <h3>View Movie Ratings</h3>
              <p>Explore ratings and details for thousands of movies.</p>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faComment} className="icon-comment" />
              <h3>Leave Reviews</h3>
              <p>
                Share your thoughts and opinions about movies you've watched.
              </p>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faHeart} className="icon-heart" />
              <h3>Add to Watchlist</h3>
              <p>Build your personal watchlist and never miss a movie.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h3>About MoviePicks</h3>
          <p>
            MoviePicks is your ultimate destination for discovering new movies,
            reading and writing reviews, and managing your personal watchlist.
            Whether you're a movie buff or just looking for something to watch
            tonight, MoviePicks has you covered!
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to make movie discovery and review easy and enjoyable
            for everyone.
          </p>
          <h3>How It Works</h3>
          <ol>
            <li>Sign up for an account</li>
            <li>Browse or search for movies</li>
            <li>Read reviews and ratings</li>
            <li>Add movies to your watchlist</li>
            <li>Leave your own reviews</li>
          </ol>

          <Link to="/signup" className="primarybtn"> Join Now </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
