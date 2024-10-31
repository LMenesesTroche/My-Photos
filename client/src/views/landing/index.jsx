import "./Landing.css";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useMedia from "use-media";
import "react-lazy-load-image-component/src/effects/blur.css"; // Efecto de desenfoque al cargar



// Este es mi perfil de incio (Lucas Meneses)
//!Activo
const Landing = () => {

  return (
    <div className="landing-container">
      <h1>Este es la landing</h1>
    </div>
  );
  
};

export default Landing;
