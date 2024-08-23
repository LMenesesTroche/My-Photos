// components/LoginButtonAuth0.js
import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import rutaBack from "../../redux/actions/rutaBack";

const LoginButtonAuth0 = () => {
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

  const handleLogin = async () => {
    loginWithRedirect();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginButtonAuth0;
