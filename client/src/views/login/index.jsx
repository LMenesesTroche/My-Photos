// src/components/Navbar.jsx
import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/auth";

// import { register } from "../../redux/actions/auth";

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

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
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
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
