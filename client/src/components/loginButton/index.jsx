import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

//? Este es el boton de login  

const LoginButtonAuth0 = () => {
  const { loginWithRedirect} = useAuth0();

  return (
    <div>
      <button onClick={loginWithRedirect}>Login</button>
    </div>
  );
};

export default LoginButtonAuth0;