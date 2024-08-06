// src/components/Navbar.jsx
import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    gmail: "",
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
    // e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
    window.alert("Submited!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Este es el Register para loguearse</h1>
        <label>Gmail</label>
        <input
          value={formData.gmail}
          onChange={handleChange}
          name="gmail"
          type="gmail"
        ></input>
        <label>Password</label>
        <input
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Login;
