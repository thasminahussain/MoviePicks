import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/MoviePicksLogo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(
      `Signing up with name: ${name}, email: ${email}, and password: ${password}`
    );
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

          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
