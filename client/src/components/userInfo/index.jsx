import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../redux/actions/photos";
import "./userInfo.modules.css";

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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

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

    const formData = new FormData();
    formData.append("file", selectedFile);
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
      setEditedPicture(newUrl); // Actualiza la imagen de perfil en la interfaz
      dispatch(
        updateProfilePicture({
          newUrl,
          auth0Id: userPublicInfo.auth0Id,
        })
      );
    } catch (error) {
      console.error("Error updating the profile picture", error);
    } finally {
      setUploading(false);
    }
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
          <div className="overlay" onClick={() => setShowPictureEdit(false)}></div>
          <div className="edit-modal">
            <h1>Select your new profile picture</h1>
            <input
              type="file"
              accept="image/*"
              className="input-edit-photo"
              onChange={handlePictureChange}
            />
            <div className="botones">
              <button onClick={() => setShowPictureEdit(false)} className="close-icon">
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
