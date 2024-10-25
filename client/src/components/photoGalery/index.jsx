import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillDelete } from "react-icons/ai";
import "./photoGalery.modules.css";

const PhotoGallery = ({ photos, onPhotoClick, isOwner, onDeletePhoto }) => {
  return (
    <div className="gallery">
      {photos &&
        photos.slice().reverse().map((photo) => (
          <div key={photo.id_photos} className="photo-item">
            <LazyLoadImage
              src={photo.lowUrl}
              className="gallery-photo"
              alt={`Foto ${photo.id_photos}`}
              onClick={() => onPhotoClick(photo)}
              effect="blur"
            />
            {isOwner && (
              <button
                className="delete-button"
                onClick={() => onDeletePhoto(photo.id_photos)}
              >
                <AiFillDelete />
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default PhotoGallery;
