import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogOutButtonAuth0 = () => {
  const { logout } = useAuth0();

  const logOutAction = async () => {
    localStorage.removeItem("authToken"); //Eliminamos el token del local storage

    logout({
      returnTo: window.location.origin, // Salimos de la autenticacion con auth0
    });
  };

  return <button onClick={logOutAction}>LogOut</button>;
};

export default LogOutButtonAuth0;
