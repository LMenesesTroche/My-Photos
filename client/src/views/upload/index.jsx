import React, { useState } from "react";
import axios from "axios";
import "./upload.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { uploadBack } from "../../redux/actions/photos";
export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "portafolioProyect"); // Reemplaza con tu upload preset de Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/decbwosgj/image/upload`, // Reemplaza con tu cloud name
        formData
      );

      dispatch(uploadBack({url: response.data.secure_url,idUser:user.sub}));

      setImageUrl(response.data.secure_url);

      setUploading(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload your photo here</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "50vh" }} />
        </div>
      )}
    </div>
  );
}
