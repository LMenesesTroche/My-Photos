import { useState } from "react";

export const usePhotoNavigation = (photos) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotateRight, setRotateRight] = useState(true);
  const [imageClass, setImageClass] = useState("modal-content");

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setRotation(0);
    setRotateRight(true);
    setImageClass("modal-content");
  };

  const handleNextPhoto = () => {
    setRotation(0);
    const currentIndex = photos.indexOf(selectedPhoto);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
    setImageClass("modal-content");
  };

  const handlePreviousPhoto = () => {
    setRotation(0);
    const currentIndex = photos.indexOf(selectedPhoto);
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[previousIndex]);
    setImageClass("modal-content");
  };

  const handleRotatePhoto = () => {
    setRotation((prevRotation) => prevRotation + (rotateRight ? 90 : -90));
    setRotateRight((prevRotateRight) => !prevRotateRight);
    setImageClass((prevClass) =>
      prevClass === "full-image" ? "modal-content" : "full-image"
    );
  };

  return {
    selectedPhoto,
    rotation,
    imageClass,
    handlePhotoClick,
    handleNextPhoto,
    handlePreviousPhoto,
    handleRotatePhoto,
  };
};
