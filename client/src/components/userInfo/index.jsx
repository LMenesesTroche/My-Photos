import React,{useState} from "react";
import { AiFillEdit } from "react-icons/ai";
import "./userInfo.modules.css";

const UserInfo = ({
  userPublicInfo,
  isOwner,
  onEditClick,
  show,
  onCloseClick,
  onClickEdit,
}) => {
  const [editedName, setEditedName] = useState(userPublicInfo.name); // Estado para el nombre editado

  const handleNameChange = (e) => {
    setEditedName(e.target.value); // Actualiza el estado cuando cambia el input
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
        <img
          src={userPublicInfo.picture}
          className="profilePhoto"
          alt="Profile"
        />
      </div>
      {show && (
        <>
          <div className="overlay" onClick={onCloseClick}></div> {/* Overlay */}
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
              value={editedName} // Asocia el estado con el input
              onChange={handleNameChange} // Maneja el cambio en el input
            />{" "}
            <div className="botones">
              <button
                onClick={onCloseClick}
                className="close-icon"
                title="Close button"
              >
                Cerrar
              </button>
              <button
                onClick={()=>{onClickEdit(editedName)}}
                className="edit-icon"
                title="Edit button"
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
