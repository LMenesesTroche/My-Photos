import React, { useState } from "react";
import axios from "axios";
import "./upload.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { uploadBack } from "../../redux/actions/photos";

export default function Upload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const handleFileChange = async (event) => {
    const selectedFile = (event.target.files[0]);
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

      dispatch(uploadBack({ url: response.data.secure_url, idUser: user.sub }));

      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploading(false);
    } finally{
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload your photo here</h1>
      <input type="file" onChange={handleFileChange} />
      {uploading && <p>"Uploading..."</p>}
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "50vh" }} />
        </div>
      )}
    </div>
  );
}
