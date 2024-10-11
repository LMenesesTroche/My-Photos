import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { storeAuthToken, removeAuthToken, checkAuthorization } from "../../redux/actions/auth";
import LoginButtonAuth0 from "../loginButton";
import LogOutButtonAuth0 from "../logoutButton";
import "./nav.css";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.auth.isAuthorized);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(storeAuthToken(user)); // Hacemos dispatch para guardar el token 
      dispatch(checkAuthorization(user)); // Verificamos si es que el usuario es el admin
    } else {
      dispatch(removeAuthToken()); // Eliminamos token si no esta autenticado
    }
  }, [isAuthenticated, user, dispatch]);

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
        {isAuthenticated && <Link to={`/profile/${user.sub}`}>Profile</Link>}
        {isAuthenticated && <Link to="/upload">Upload</Link>}
        <Link to="/allUsers">All users</Link>
        {isAuthenticated ? <LogOutButtonAuth0 /> : <LoginButtonAuth0 />}
        {isAuthorized && <Link to="/dashboard">Dashboard</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
