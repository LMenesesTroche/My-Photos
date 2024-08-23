// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./nav.css";
import axios from 'axios';
import LoginButtonAuth0  from '../auth0/index'
import LogOutButtonAuth0  from '../auth0LogOut/index'
import {useAuth0} from "@auth0/auth0-react";
import rutaBack from "../../redux/actions/rutaBack";

const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  // Enviar la información del usuario al backend cuando el usuario está autenticado
  useEffect(() => {
    const sendInfoBack = async () => {
      if (isAuthenticated && user) {
        try {
          await axios.post(`${rutaBack}/users/api`, user);
          console.log("User information sent to the backend.");
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
    };

    sendInfoBack();
  }, [isAuthenticated, user]); // Este useEffect se ejecuta cuando isAuthenticated o user cambian
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
