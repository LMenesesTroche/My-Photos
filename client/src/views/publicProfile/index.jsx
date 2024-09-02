import React from "react";
import { useParams } from "react-router-dom";
import { getUserInfoById } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useMedia from "use-media";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PublicProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userPublicInfo = useSelector((state) => state.users.userPublicInfo);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotateRight, setRotateRight] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [imageClass, setImageClass] = useState("modal-content");

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
    const previousIndex = (currentIndex - 1 + userPublicInfo.photos.length) % userPublicInfo.photos.length;
    setSelectedPhoto(userPublicInfo.photos[previousIndex]);
    setImageClass("modal-content");
  };

  const toggleButtonsAndBackground = (e) => {
    e.stopPropagation();
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  // Verifica que userPublicInfo no sea null o undefined antes de intentar acceder a sus propiedades
  if (!userPublicInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-container">
      <div className="userInfo">
        <div className="userText">
          <h1 className="userName">{userPublicInfo.name}</h1>
          <h2 className="works">Selected Work</h2>
        </div>
        <div className="imageSection">
          <img src={userPublicInfo.picture} className="profilePhoto" alt="Profile" />
        </div>
      </div>
      <div className="gallery">
        {userPublicInfo.photos && userPublicInfo.photos.map(
          (photo, index) => (
            <LazyLoadImage
              key={index}
              src={photo}
              className="gallery-photo"
              alt={`Foto ${index + 1}`}
              onClick={() => handlePhotoClick(photo)}
              effect="blur"
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
                &lt; {/* Left Arrow */}
              </button>
              <button className="next-button" onClick={handleNextPhoto}>
                &gt; {/* Right Arrow */}
              </button>
            </>
          )}
          <img
            className={imageClass}
            src={selectedPhoto}
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
