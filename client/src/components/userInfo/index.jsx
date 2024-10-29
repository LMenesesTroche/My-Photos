import React, { useState, useCallback } from "react";
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../redux/actions/photos";
import "./userInfo.modules.css";
import Cropper from "react-easy-crop";
import Compressor from "compressorjs";

const UserInfo = ({
  userPublicInfo,
  isOwner,
  onEditClick,
  show,
  onCloseClick,
  onClickEdit,
}) => {
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(userPublicInfo.name);
  const [editedPicture, setEditedPicture] = useState(userPublicInfo.picture);
  const [showPictureEdit, setShowPictureEdit] = useState(false);
  const [mostrarRecortador, setMostrarRecortador] = useState(false);

  // Estados para crop
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handlePictureChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      Swal.fire({
        title: "Must select a valid file type",
        text: "(jpg, png, etc.).",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result); // Establece el src de la imagen
      setShowPictureEdit(false);
      setMostrarRecortador(true);
    };
    reader.readAsDataURL(selectedFile);
  };
  // Procesa la imagen recortada y comprimida para subirla
  const handleUpload = async () => {
    if (!croppedAreaPixels || !imageSrc) return;

    // Extrae la sección recortada
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

    // Comprime la imagen
    new Compressor(croppedImage, {
      quality: 0.6, // Ajusta la calidad de la imagen
      success: async (compressedBlob) => {
        const formData = new FormData();
        formData.append("file", compressedBlob);
        formData.append("upload_preset", "portafolioProyect");

        try {
          setUploading(true);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/decbwosgj/image/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
              },
            }
          );

          const newUrl = response.data.secure_url;
          setEditedPicture(newUrl);
          dispatch(
            updateProfilePicture({ newUrl, auth0Id: userPublicInfo.auth0Id })
          );
          setMostrarRecortador(false);
        } catch (error) {
          console.error("Error updating the profile picture", error);
        } finally {
          setUploading(false);
        }
      },
      error(err) {
        console.error("Error compressing image:", err);
      },
    });
  };

  return (
    <div className="userInfo">
      <div className="userText">
        <h1 className="userName">
          {userPublicInfo.name}
          {isOwner && (
            <AiFillEdit
              className="editIcon"
              onClick={onEditClick}
              title="Edit Profile"
            />
          )}
        </h1>
        <h2 className="works">Selected Work</h2>
      </div>
      <div className="imageSection">
        <img src={editedPicture} className="profilePhoto" alt="Profile" />
        {isOwner && (
          <AiFillEdit
            className="editIcon editPhotoIcon"
            onClick={() => setShowPictureEdit(true)}
            title="Edit Profile Photo"
          />
        )}
      </div>
      {show && (
        <>
          <div className="overlay" onClick={onCloseClick}></div>
          <div className="edit-modal">
            <h1>Edit your username</h1>
            <input
              type="text"
              id="userName"
              name="userName"
              className="input-edit"
              required
              minLength="1"
              maxLength="30"
              size="10"
              value={editedName}
              onChange={handleNameChange}
            />
            <div className="botones">
              <button onClick={onCloseClick} className="close-icon">
                Cerrar
              </button>
              <button
                onClick={() => {
                  onClickEdit(editedName, editedPicture);
                }}
                className="edit-icon"
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
      {showPictureEdit && (
        <>
          <div
            className="overlay"
            onClick={() => setShowPictureEdit(false)}
          ></div>
          <div className="edit-modal">
            <h1>Select your new profile picture</h1>
            <input
              type="file"
              accept="image/*"
              className="input-edit-photo"
              onChange={handlePictureChange}
            />
            <div className="botones">
              <button
                onClick={() => setShowPictureEdit(false)}
                className="close-icon"
              >
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
      {mostrarRecortador && (
        <>
          <div className="overlay"></div>
          
          <div className="edit-modal">
          {uploading ? <h3>CARGANDOO....</h3> : 
          <>
          
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="botones">
              <button
                onClick={() => setMostrarRecortador(false)}
                className="close-icon"
              >
                Cerrar
              </button>
              <button onClick={handleUpload} className="upload-icon">
                Upload
              </button>
            </div>
          </>

          }
          </div>
        </>
      )}
    </div>
  );
};

// Función auxiliar para extraer la imagen recortada
async function getCroppedImg(imageSrc, crop) {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.src = imageSrc;
  await new Promise((resolve) => (img.onload = resolve));

  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg");
  });
}

export default UserInfo;
