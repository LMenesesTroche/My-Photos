import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//? Este es el boton de logOut  

const LogOutButtonAuth0 = () => {
  const { logout } = useAuth0();

  return <button onClick={logout}>LogOut</button>;
};

export default LogOutButtonAuth0;
