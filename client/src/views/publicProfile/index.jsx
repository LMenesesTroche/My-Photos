import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfoById, deletePhoto } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import useMedia from "use-media";
import UserInfo from "../../components/userInfo";
import PhotoGallery from "../../components/photoGalery";
import ModalViewer from "../../components/modalviewer";
import { usePhotoNavigation } from "../../components/usePhotoNavegation";
import { updateUserName } from "../../redux/actions/users";

const PublicProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userPublicInfo = useSelector((state) => state.users.userPublicInfo);
  const { user, isAuthenticated } = useAuth0();
  const isLargeScreen = useMedia({ minWidth: 768 });
  // const navigate = useNavigate(); // Hook para realizar la navegación
  const [ showModal, setShowModal ] = useState(false);

  const {
    selectedPhoto,
    rotation,
    imageClass,
    handlePhotoClick,
    handleNextPhoto,
    handlePreviousPhoto,
    handleRotatePhoto,
  } = usePhotoNavigation(userPublicInfo?.photos || []);

  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    dispatch(getUserInfoById(id));
  }, [dispatch, id]);

  const isOwner = isAuthenticated && user.sub === id;

  const toggleButtonsAndBackground = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  const handleDeletePhoto = (photoId) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      dispatch(deletePhoto(id, photoId));
    }
  };

  const handleEditName = (newName) => {
    dispatch(updateUserName(id, newName)); // Llama a la acción de actualizar nombre con el nuevo nombre
    setShowModal(false); 
  };

  if (!userPublicInfo) {
    return <div>Loading...</div>;
  }

  if (userPublicInfo.hasBeenBlocked) {
    return (
      <div className="blocked-alert">
        <p>This user has been blocked and cannot access the system.</p>
      </div>
    );
  }

  
  return (
    <div className="publiProfile-container">
      <UserInfo
        userPublicInfo={userPublicInfo}
        isOwner={isOwner}
        onEditClick={() => setShowModal(true)}
        show={showModal}
        onCloseClick={() => setShowModal(false)}
        onClickEdit={handleEditName}
      />

      <PhotoGallery
        photos={userPublicInfo.photos}
        onPhotoClick={handlePhotoClick}
        isOwner={isOwner}
        onDeletePhoto={handleDeletePhoto}
      />
      <ModalViewer
        selectedPhoto={selectedPhoto}
        rotation={rotation}
        showButtons={showButtons}
        isLargeScreen={isLargeScreen}
        imageClass={imageClass}
        handleCloseModal={() => handlePhotoClick(null)}
        handleRotatePhoto={handleRotatePhoto}
        handleNextPhoto={handleNextPhoto}
        handlePreviousPhoto={handlePreviousPhoto}
        toggleButtonsAndBackground={toggleButtonsAndBackground}
      />
    </div>
  );
};

export default PublicProfile;
