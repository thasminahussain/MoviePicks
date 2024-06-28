import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/MoviePicksLogo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("User signed in successfully:", user);
        // Update state to indicate successful sign-in
        setSignInSuccess(true);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </nav>

      <div className="auth-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Sign In</button>
        </form>

        <p>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>

        {signInSuccess && (
          <p>
            Signed in successfully! Redirecting to{" "}
            <Link to="/watchlist">Watchlist</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
