import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upload.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { uploadBack } from "../../redux/actions/photos";
import rutaBack from "../../redux/actions/rutaBack";
import PayPalButton from "../../components/paypal";

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  // const [loadingPaymentStatus, setLoadingPaymentStatus] = useState(true);
  const dispatch = useDispatch();
  const { user } = useAuth0();


  

  const handleFileChange = async (event) => {
    if (!hasPaid) {
      alert("Please pay $10 via PayPal before uploading images.");
      return;
    }
  
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
  
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "portafolioProyect");
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/decbwosgj/image/upload`,
        formData
      );
  
      const highUrl = response.data.secure_url;
  
      // Generar una URL de baja calidad (por ejemplo, q_auto:low)
      const lowUrl = highUrl.replace("/upload/", "/upload/q_auto:low/");
 
      // Envía ambas URLs al backend o guárdalas en el estado.
      dispatch(uploadBack({ 
        highUrl, 
        lowUrl, 
        id_user: user.sub 
      }));
  
      setImageUrl(lowUrl); // Usas la de alta calidad para la vista previa, por ejemplo.
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };
  


  return (
    <div className="container">
      <h1>Upload your photo here</h1>
      {!hasPaid ? (
        <div>
          <p>Please pay $10 via PayPal to upload images.</p>
          {/* Aquí puedes incluir un botón o enlace para el pago de PayPal */}
          <PayPalButton totalValue={10} invoice={"Taza de cafe "}/>
        </div>
      ) : (
        <>
          <input type="file" onChange={handleFileChange} />
          {uploading && <p>"Uploading..."</p>}
          {imageUrl && (
            <div>
              <h2>Uploaded Image:</h2>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "50vh" }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
