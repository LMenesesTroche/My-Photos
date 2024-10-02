import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./nav.css";
import axios from 'axios';
import LoginButtonAuth0 from '../loginButton';
import LogOutButtonAuth0 from '../logoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import rutaBack from "../../redux/actions/rutaBack";

const Navbar = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    //TODO REVISAR URGENTE
    // Enviar la información del usuario al backend cuando el usuario está autenticado
    useEffect(() => {
        const storeToken = async () => {
            if (isAuthenticated) {
                try {
                    // const token = await getAccessTokenSilently({
                    //     audience: 'YOUR_AUTH0_API_AUDIENCE', // Reemplazar con el audience correcto
                    //     scope: 'read:current_user' // O cualquier otro scope que necesites
                    // });
                    // console.log("Token obtenido:", token); // Verifica que el token tenga el formato JWT correcto
                    // localStorage.setItem('authToken', token);

                    // Envía la información del usuario y espera el token JWT del backend
                    const response = await axios.post(`${rutaBack}/users/api`, user);
                    localStorage.setItem('authToken', response.data.token); // Almacena el JWT recibido
                    console.log("Este es el token del back",response.data.token)
                    // console.log("Esto  esta en localStorage")
                } catch (error) {
                    console.error("Error getting or storing token:", error);
                }
            } else {
                localStorage.removeItem('authToken');
            }
        };
        storeToken();
    }, [isAuthenticated, getAccessTokenSilently, user]); // Este useEffect se ejecuta cuando isAuthenticated, getAccessTokenSilently o user cambian

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
                {isAuthenticated ? <Link to="/userData">Profile</Link> : null}
                {isAuthenticated ? <Link to="/upload">Upload</Link> : null}
                <Link to="/allUsers">All users</Link>
                {isAuthenticated ? <LogOutButtonAuth0 /> : <LoginButtonAuth0 />}
            </div>
        </nav>
    );
};

export default Navbar;
