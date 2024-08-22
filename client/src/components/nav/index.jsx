// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import LoginButtonAuth0  from '../auth0/index'
import LogOutButtonAuth0  from '../auth0LogOut/index'
import {useAuth0} from "@auth0/auth0-react";

const Navbar = () => {
  const {isAuthenticated} = useAuth0();

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
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/userData">Profile</Link>
        <Link to="/upload">Upload</Link>

        {isAuthenticated ?  <LogOutButtonAuth0/>:<LoginButtonAuth0/>}
        

      </div>
    </nav>
  );
};

export default Navbar;
