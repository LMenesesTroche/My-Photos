// src/components/Navbar.jsx
import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    //This handle is for change the value of formData
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem('token');

    window.alert("Log out succesfully");
  };

  return (
    <div>
      <form className="form-container">
        <h1>LOGIN</h1>
        <label>email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
        ></input>
        <label>Password</label>
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
        ></input>
        <Link to="/register">Register</Link>
        <button onClick={handleSubmit}>LOGIN</button>
        <button onClick={handleLogout}>LOGOUT</button>

      </form>
    </div>
  );
};

export default Login;
