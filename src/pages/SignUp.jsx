import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/MoviePicksLogo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (response.ok) {
        window.alert("User registered successfully!")
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="MoviePicks Logo" />
          </div>
        </div>
      </nav>

      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <Link to="/signIn">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;




