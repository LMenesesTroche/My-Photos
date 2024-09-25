const { photos, user } = require("../../db");

const deletePhoto = async ({ id_user, id_photo }) => {

  const foundUser = await user.findOne({
    where: {
        auth0Id: id_user
    },
  });

  const findPhoto = await photos.findByPk(id_photo);

  if (!foundUser) {
    throw new Error("User not found");
  }

  if (!findPhoto) {
    throw new Error("Photo not found");
  }

  const destroy = await photos.destroy({
    where: {
        id_photos:id_photo
    }
  });

  if(destroy){
    return {message:"Deleted succesfully"};
  }else {
    throw new Error("Failed to delete photo");
  }
  
};

module.exports = deletePhoto;
