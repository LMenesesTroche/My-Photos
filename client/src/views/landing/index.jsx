import "./Landing.css"; 
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useMedia from "use-media";
import "react-lazy-load-image-component/src/effects/blur.css"; // Efecto de desenfoque al cargar
import axios from "axios";

const Landing = () => {
  // const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotateRight, setRotateRight] = useState(true); // Estado para rotación intercalada
  const [showButtons, setShowButtons] = useState(true); // Estado para mostrar/ocultar botones
  const [imageClass, setImageClass] = useState("modal-content"); // Estado para manejar la clase de imagen

  // Hook para determinar si la pantalla es grande 
  const isLargeScreen = useMedia({ minWidth: "1024px" });

  const userInfo = {
    name: "Lucas Meneses",
    img:"https://res.cloudinary.com/decbwosgj/image/upload/v1724859877/20240129-_DSC0003_jhqckq.jpg",
    photos:[
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847469/photos/1706281340228_s1gpiq.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847469/photos/1706281340228_s1gpiq.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847794/photos/1721846334013_zvrkjb.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847794/photos/1721846334013_zvrkjb.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847465/photos/1721846334388_l43xrk.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847465/photos/1721846334388_l43xrk.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848061/photos/1721846334499_hikyt7.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848061/photos/1721846334499_hikyt7.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847461/photos/1721846334945_hgceez.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847461/photos/1721846334945_hgceez.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848070/photos/1721846334983_n4jaxr.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848070/photos/1721846334983_n4jaxr.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848070/photos/1721846335315_yoiu0l.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848070/photos/1721846335315_yoiu0l.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846335580_t1wi74.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846335580_t1wi74.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847470/photos/1721846335852_axlkyx.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847470/photos/1721846335852_axlkyx.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847468/photos/1721846335948_inbxtv.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847468/photos/1721846335948_inbxtv.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847459/photos/1721846335987_wymo22.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847459/photos/1721846335987_wymo22.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847467/photos/1721846336002_aggase.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847467/photos/1721846336002_aggase.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846336088_m3fjie.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846336088_m3fjie.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847461/photos/1721846336495_cu7hhq.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847461/photos/1721846336495_cu7hhq.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846336670_tjkhpm.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846336670_tjkhpm.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847469/photos/1721846337725_ys4yiz.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721847469/photos/1721846337725_ys4yiz.jpg"
      },
      {
          "low_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721838977/photos/20240715-_DSC2423_col4p3.jpg",
          "high_res_url": "https://res.cloudinary.com/decbwosgj/image/upload/v1721838977/photos/20240715-_DSC2423_col4p3.jpg"
      },
      
  ]
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePreviousPhoto(e);
      } else if (e.key === "ArrowRight") {
        handleNextPhoto(e);
      }
    };

    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setRotation(0); // Reinicia la rotación al abrir una nueva imagen
    setRotateRight(true); // Reinicia la dirección de rotación
    setShowButtons(true); // Asegura que los botones se muestren inicialmente
    setImageClass("modal-content"); // Resetea la clase de imagen
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleRotatePhoto = (e) => {
    e.stopPropagation();
    setRotation((prevRotation) => prevRotation + (rotateRight ? 90 : -90));
    setRotateRight((prevRotateRight) => !prevRotateRight); // Alterna la dirección de rotación
    setImageClass((prevClass) =>
      prevClass === "full-image" ? "modal-content" : "full-image"
    );
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setRotation(0); // Reinicia la rotación al cambiar de imagen
    const currentIndex = photos.indexOf(selectedPhoto);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
    setImageClass("modal-content"); // Resetea la clase de imagen al cambiar
  };

  const handlePreviousPhoto = (e) => {
    e.stopPropagation();
    setRotation(0); // Reinicia la rotación al cambiar de imagen
    const currentIndex = photos.indexOf(selectedPhoto);
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[previousIndex]);
    setImageClass("modal-content"); // Resetea la clase de imagen al cambiar
  };

  const toggleButtonsAndBackground = (e) => {
    e.stopPropagation();
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  return (
    <div className="landing-container">
      <div className="userInfo">
        <div className="userText">
          <h1 className="userName">Lucas Meneses</h1>
          <h2 className="works">Selected Work</h2>
        </div>
        <div className="imageSection">
          <img src={userInfo.img} className="porfilePhoto" alt="Profile" />
        </div>
      </div>
      <div className="gallery">
        {userInfo.photos.map(
          (photo, index) =>
            photo.low_res_url && (
              <LazyLoadImage
                key={index}
                src={photo.low_res_url}
                className="gallery-photo"
                alt={`Foto ${index + 1}`}
                onClick={() => handlePhotoClick(photo)}
                effect="blur" // Efecto de desenfoque al cargar
              />
            )
        )}
      </div>
      {selectedPhoto && (
        <div
          className={`modal ${showButtons ? "" : "modal-black"}`}
          onClick={handleCloseModal}
        >
          {showButtons && (
            <>
              <span className="close" onClick={handleCloseModal}>&times;</span>
              {!isLargeScreen && (
                <button className="rotate-button" onClick={handleRotatePhoto}>
                  Rotate
                </button>
              )}
              <button className="prev-button" onClick={handlePreviousPhoto}>
                &lt; {/* Flecha izquierda */}
              </button>
              <button className="next-button" onClick={handleNextPhoto}>
                &gt; {/* Flecha derecha */}
              </button>
            </>
          )}
          <img
            className={imageClass}
            src={selectedPhoto.high_res_url} // Usa la URL de alta resolución
            alt="Expanded"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={toggleButtonsAndBackground} 
          />
        </div>
      )}
    </div>
  );
};

export default Landing;
