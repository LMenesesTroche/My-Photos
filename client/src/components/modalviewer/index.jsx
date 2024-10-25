import React from "react";
import "./modalViewer.modules.css";
const ModalViewer = ({
  selectedPhoto,
  rotation,
  showButtons,
  isLargeScreen,
  imageClass,
  handleCloseModal,
  handleRotatePhoto,
  handleNextPhoto,
  handlePreviousPhoto,
  toggleButtonsAndBackground
}) => {
  if (!selectedPhoto) return null;

  return (
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
        src={selectedPhoto.highUrl}
        alt="Expanded"
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={toggleButtonsAndBackground}
      />
    </div>
  );
};

export default ModalViewer;
