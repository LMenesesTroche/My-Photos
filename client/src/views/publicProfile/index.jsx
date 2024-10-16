import React from "react";
import { useParams } from "react-router-dom";
import { getUserInfoById, deletePhoto } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useMedia from "use-media";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillDelete } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const PublicProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userPublicInfo = useSelector((state) => state.users.userPublicInfo);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotateRight, setRotateRight] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [imageClass, setImageClass] = useState("modal-content");
  const { user, isAuthenticated } = useAuth0();
  const isLargeScreen = useMedia({ minWidth: 768 });

  useEffect(() => {
    dispatch(getUserInfoById(id));
  }, [dispatch, id]);

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

  let isThisTheOwnerOfThePhoto = false;
  if (isAuthenticated && user.sub === id) {
    isThisTheOwnerOfThePhoto = true;
  }

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setRotation(0);
    setRotateRight(true);
    setShowButtons(true);
    setImageClass("modal-content");
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleRotatePhoto = (e) => {
    e.stopPropagation();
    setRotation((prevRotation) => prevRotation + (rotateRight ? 90 : -90));
    setRotateRight((prevRotateRight) => !prevRotateRight);
    setImageClass((prevClass) =>
      prevClass === "full-image" ? "modal-content" : "full-image"
    );
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setRotation(0);
    const currentIndex = userPublicInfo.photos.indexOf(selectedPhoto);
    const nextIndex = (currentIndex + 1) % userPublicInfo.photos.length;
    setSelectedPhoto(userPublicInfo.photos[nextIndex]);
    setImageClass("modal-content");
  };

  const handlePreviousPhoto = (e) => {
    e.stopPropagation();
    setRotation(0);
    const currentIndex = userPublicInfo.photos.indexOf(selectedPhoto);
    const previousIndex =
      (currentIndex - 1 + userPublicInfo.photos.length) %
      userPublicInfo.photos.length;
    setSelectedPhoto(userPublicInfo.photos[previousIndex]);
    setImageClass("modal-content");
  };

  const toggleButtonsAndBackground = (e) => {
    e.stopPropagation();
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  const handleDeletePhoto = async (id_user, id_photo) => {
    try {
      if (window.confirm("Are you sure you want to delete this photo?")) {
        dispatch(deletePhoto(id_user, id_photo));
      }
    } catch (error) {
      console.error("Error obteniendo el token de acceso", error);
    }
  };

  if (!userPublicInfo) {
    return <div>Loading...</div>;
  }

  if (userPublicInfo && userPublicInfo.hasBeenBlocked == true) {
    return (<div className="blocked-alert">
      <p>This user has been blocked and cannot access the system.</p>
    </div>);
  }

  return (
    <div className="landing-container">
      <div className="userInfo">
        <div className="userText">
          <h1 className="userName">{userPublicInfo.name}</h1>
          <h2 className="works">Selected Work</h2>
        </div>
        <div className="imageSection">
          <img
            src={userPublicInfo.picture}
            className="profilePhoto"
            alt="Profile"
          />
        </div>
      </div>

      <div className="gallery">
        {userPublicInfo.photos &&
          userPublicInfo.photos
            .slice()
            .reverse()
            .map((photo) => (
              <div key={photo.id_photos} className="photo-item">
                <LazyLoadImage
                  src={photo.lowUrl} // Usa lowUrl para la vista previa en la galería
                  className="gallery-photo"
                  alt={`Foto ${photo.id_photos}`}
                  onClick={() => handlePhotoClick(photo)}
                  effect="blur"
                />
                {isThisTheOwnerOfThePhoto ? (
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeletePhoto(userPublicInfo.auth0Id, photo.id_photos)
                    }
                  >
                    <AiFillDelete />
                  </button>
                ) : null}
              </div>
            ))}
      </div>

      {selectedPhoto && (
        <div
          className={`modal ${showButtons ? "" : "modal-black"}`}
          onClick={handleCloseModal}
        >
          {showButtons && (
            <>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              {!isLargeScreen && (
                <button className="rotate-button" onClick={handleRotatePhoto}>
                  Rotate
                </button>
              )}
              <button className="prev-button" onClick={handlePreviousPhoto}>
                &lt;
              </button>
              <button className="next-button" onClick={handleNextPhoto}>
                &gt;
              </button>
            </>
          )}
          <img
            className={imageClass}
            src={selectedPhoto.highUrl} // Usa highUrl para la vista en el modal
            alt="Expanded"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={toggleButtonsAndBackground}
          />
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
