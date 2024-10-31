import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillDelete } from "react-icons/ai";
import "./photoGalery.modules.css";

const ItemTypes = {
  PHOTO: "photo",
};

const DraggablePhoto = ({
  photo,
  index,
  movePhoto,
  onPhotoClick,
  isOwner,
  onDeletePhoto,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PHOTO,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PHOTO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePhoto(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={isOwner ? (node) => drag(drop(node)) : null}
      className="photo-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
  );
};

const PhotoGallery = ({ photos, onPhotoClick, isOwner, onDeletePhoto }) => {
  const [photoList, setPhotoList] = useState(photos);
  const scrollInterval = useRef(null);

  const movePhoto = useCallback(
    (fromIndex, toIndex) => {
      const updatedPhotos = [...photoList];
      const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
      updatedPhotos.splice(toIndex, 0, movedPhoto);
      setPhotoList(updatedPhotos);
    },
    [photoList]
  );

  // Auto-scroll function
  const handleAutoScroll = useCallback((event) => {
    const { clientY } = event;
    const scrollMargin = 100; // Distance from the edge to start scrolling
    const scrollSpeed = 10; // Pixels per interval

    // Clear any existing scroll interval
    clearAutoScroll();

    if (clientY < scrollMargin) {
      // Near the top
      scrollInterval.current = setInterval(
        () => window.scrollBy(0, -scrollSpeed),
        20
      );
    } else if (window.innerHeight - clientY < scrollMargin) {
      // Near the bottom
      scrollInterval.current = setInterval(
        () => window.scrollBy(0, scrollSpeed),
        20
      );
    }
  }, []);

  // Clear auto-scroll function
  const clearAutoScroll = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOwner) {
      window.addEventListener("dragover", handleAutoScroll);
      window.addEventListener("dragleave", clearAutoScroll);
      window.addEventListener("drop", clearAutoScroll);
    }
    return () => {
      window.removeEventListener("dragover", handleAutoScroll);
      window.removeEventListener("dragleave", clearAutoScroll);
      window.removeEventListener("drop", clearAutoScroll);
      clearAutoScroll(); // Clear any interval on unmount
    };
  }, [handleAutoScroll, clearAutoScroll, isOwner]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gallery">
        {photoList &&
          photoList.map((photo, index) => (
            <DraggablePhoto
              key={photo.id_photos}
              photo={photo}
              index={index}
              movePhoto={movePhoto}
              onPhotoClick={onPhotoClick}
              isOwner={isOwner}
              onDeletePhoto={onDeletePhoto}
            />
          ))}
      </div>
    </DndProvider>
  );
};

export default PhotoGallery;
