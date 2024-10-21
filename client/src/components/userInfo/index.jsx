import React from "react";
import { AiFillEdit } from "react-icons/ai";
import "./userInfo.modules.css";

const UserInfo = ({ userPublicInfo, isOwner, onEditClick }) => {
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
    </div>
  );
};

export default UserInfo;
