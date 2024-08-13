// src/components/Navbar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/auth";
const Register = () => {
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
    // console.log(formData);
    dispatch(register(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>REGISTER</h1>
        <label>Email</label>
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
        <Link to="/login">Login</Link>
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
