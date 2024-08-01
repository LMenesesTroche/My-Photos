// src/components/Navbar.jsx
import React from "react";
import "./login.css";

const Login = () => {
    const handleSubmit = () => {
        window.alert("Submit!")
    }
    return (
    <div>
      <form 
      onSubmit={handleSubmit}
      className="form-container"
      >
        <h1>Este es el Register para loguearse</h1>
        <label>Gmail</label>
        <input></input>
        <label>Password</label>
        <input></input>

      </form>
    </div>
  );
};

export default Login;
