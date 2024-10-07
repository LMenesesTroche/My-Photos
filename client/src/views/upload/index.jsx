import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upload.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBack } from "../../redux/actions/photos";
import PayPalButton from "../../components/paypal";
import { userHasPaidById } from "../../redux/actions/users";
import { Link } from "react-router-dom";

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);  // Estado para el progreso de carga
  const [imageLoaded, setImageLoaded] = useState(false);  // Estado para controlar el difuminado de la imagen
  const { user, isAuthenticated } = useAuth0();  
  const hasPaid = useSelector((state) => state.users.hasPaid);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(userHasPaidById(user.sub));
    }
  }, [dispatch, user, isAuthenticated]);

  const handleFileChange = async (event) => {
    if (!hasPaid) {
      alert("Please pay $10 via PayPal before uploading images.");
      return;
    }

    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0); // Resetea el progreso

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "portafolioProyect");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/decbwosgj/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted); // Actualiza el progreso
          },
        }
      );

      const highUrl = response.data.secure_url;
      const lowUrl = highUrl.replace("/upload/", "/upload/q_auto:low/");

      dispatch(uploadBack({ 
        highUrl, 
        lowUrl, 
        id_user: user.sub 
      }));

      setImageUrl(lowUrl);
      setImageLoaded(false); // Inicia con la imagen no cargada
    } catch (error) {
      console.error("Error uploading the image", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true); // Marca la imagen como cargada para remover el difuminado
  };

  return (
    <div className="container">
      <h1>Upload your photo here</h1>
      {!hasPaid ? (
        <div>
          <p>Please pay $10 via PayPal to upload images.</p>
          <PayPalButton totalValue={10} invoice={"Taza de cafe "} />
        </div>
      ) : (
        <>
          <input type="file" onChange={handleFileChange} />
          {uploading && <p>Uploading... {progress}%</p>}
          {imageUrl && (
            <div>
              <h2>Image uploaded successfully!</h2>
              <div className="image-container">
                {!imageLoaded && (
                  // Mostrar el skeleton loader mientras la imagen carga
                  <div className="skeleton-loader"></div>
                )}
                <Link to={`/profile/${user.sub}`}>
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className={`uploaded-image ${imageLoaded ? "loaded" : "loading"}`}
                    onLoad={handleImageLoad}  // Llama cuando la imagen ha terminado de cargar
                    style={{ maxWidth: "50vh" }}
                  />
                </Link>
                {!imageLoaded && (
                  // Mostrar spinner mientras la imagen carga
                  <div className="spinner"></div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
