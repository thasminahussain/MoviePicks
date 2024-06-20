import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from "../assets/MoviePicksLogo.png";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(`Signing in with email: ${email} and password: ${password}`);
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

          <button type="submit">Sign In</button>
        </form>

        <p>Don't have an account? <Link to="/signUp">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
