import "./Landing.css"; // Asegúrate de importar el archivo CSS
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useMedia from "use-media";
import "react-lazy-load-image-component/src/effects/blur.css"; // Efecto de desenfoque al cargar
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { getUserNumber } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const Landing = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotateRight, setRotateRight] = useState(true); // Estado para rotación intercalada
  const [showButtons, setShowButtons] = useState(true); // Estado para mostrar/ocultar botones
  const [imageClass, setImageClass] = useState("modal-content"); // Estado para manejar la clase de imagen
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const number = localStorage.getItem("number");
  const [userName, setUserName] = useState("Not logged yet");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {      
      // Extraer la información del token
      const payloadBase64 = token.split('.')[1]; // Obtenemos la segunda parte del token
      const payload = JSON.parse(atob(payloadBase64)); // Decodificamos el Base64 y parseamos a JSON
      setUserName(payload.email);
      console.log("Información contenida en el token:", payload);

      console.log(token)
      //Verificar que el token sirve
      dispatch(getUserNumber());
      console.log("El number",number)

    }
  }, [token]);

  // Hook para determinar si la pantalla es grande (por ejemplo, >= 1024px)
  const isLargeScreen = useMedia({ minWidth: "1024px" });

  const userInfo = {
    name: "Lucas Meneses",
    // img: "https://res.cloudinary.com/decbwosgj/image/upload/v1722031509/20240129-_DSC0003_td9yoq.jpg",
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/photos");
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchPhotos();
  }, []);

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextPhoto,
    onSwipedRight: handlePreviousPhoto,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="landing-container">
      <div className="userInfo">
        <div className="userText">
          <h1 className="userName">{userName}</h1>
          <h2 className="works">Selected Work</h2>
        </div>
        <div className="imageSection">
          <img src={userInfo.img} className="porfilePhoto" alt="Profile" />
        </div>
      </div>
      <div className="gallery">
        {photos.map(
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
            onClick={toggleButtonsAndBackground} // Toggle buttons and background on image click
          />
        </div>
      )}
    </div>
  );
};

export default Landing;
