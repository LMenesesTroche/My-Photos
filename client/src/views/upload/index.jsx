import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upload.css";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [localStorageValue, setLocalStorageValue] = useState(localStorage.getItem("myLocalStorageKey") || true);

  useEffect(() => {
    const storedValue = localStorage.getItem("myLocalStorageKey");
    if (storedValue !== null) {
      setLocalStorageValue(storedValue === "true");
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = () => {
    const newValue = !localStorageValue;
    setLocalStorageValue(newValue);
    localStorage.setItem("myLocalStorageKey", newValue.toString());
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
      <h1>Upload your photo</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleClick} >Local Storage: {localStorageValue ? "True" : "False"}</button>
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