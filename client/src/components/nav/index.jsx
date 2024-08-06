// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import LoginButton from "../login/login"
import LogOutButton from "../login/logOut"
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          className="logo"
          src="https://img.freepik.com/vector-premium/icono-camara-vector-elegante-minimalista_619470-598.jpg?w=740"
          alt="Logo"
        />
      </Link>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/upload">Upload</Link>
        {/* <LoginButton/>
        <LogOutButton/> */}
      </div>
    </nav>
  );
};

export default Navbar;
