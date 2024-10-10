import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import axios from "axios";
import LoginButtonAuth0 from "../loginButton";
import LogOutButtonAuth0 from "../logoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import rutaBack from "../../redux/actions/rutaBack";

const Navbar = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAuthorized, setIsAuthorized] = useState(false); // Nuevo estado para controlar si está autorizado

  // Enviar la información del usuario al backend cuando el usuario está autenticado
  useEffect(() => {
    const storeToken = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.post(`${rutaBack}/users/api`, user);
          localStorage.setItem("authToken", response.data.token); // Almacena el JWT recibido
        } catch (error) {
          console.error("Error getting or storing token:", error);
        }
      } else {
        localStorage.removeItem("authToken");
      }
    };
    storeToken();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  // Verificar si el usuario está autorizado
  useEffect(() => {
    if (isAuthenticated) {
      if (
        user.email === import.meta.env.VITE_APP_ADMIN_EMAIL &&
        user.sub === import.meta.env.VITE_APP_ADMIN_AUTH0_ID
      ) {
        setIsAuthorized(true); // Usuario autorizado
      } else {
        setIsAuthorized(false); // Usuario no autorizado
      }
    }
  }, [isAuthenticated, user]);

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
        {isAuthenticated ? (
          <Link to={`/profile/${user.sub}`}>Profile</Link>
        ) : null}
        {isAuthenticated ? <Link to="/upload">Upload</Link> : null}
        <Link to="/allUsers">All users</Link>
        {isAuthenticated ? <LogOutButtonAuth0 /> : <LoginButtonAuth0 />}
        {isAuthorized ? <Link to="/dashboard">Dashboard</Link> : null} 
      </div>
    </nav>
  );
};

export default Navbar;
