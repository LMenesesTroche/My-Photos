const { photos, user } = require("../../db");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deletePhoto = async ({ id_user, id_photo }) => {
  const foundUser = await user.findOne({
    where: { auth0Id: id_user },
  });

  if (!foundUser) {
    throw new Error("User not found");
  }

  const findPhoto = await photos.findOne({
    where: { id_photos: id_photo, id_user: foundUser.id_user },
  });

  if (!findPhoto) {
    throw new Error("Photo not found or you are not the owner");
  }

  // Extraer el public_id de la URL
  const cloudinaryPublicId = findPhoto.highUrl.split("/upload/")[1].split("/").slice(1).join("/").split(".")[0];
  // console.log("Esto es el cloudinaryPublicId:", cloudinaryPublicId);

  try {
    await cloudinary.uploader.destroy(cloudinaryPublicId); // Elimina la imagen de Cloudinary
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error("Failed to delete photo from Cloudinary");
  }

  const destroy = await photos.destroy({
    where: { id_photos: id_photo, id_user: foundUser.id_user },
  });

  if (destroy) {
    return { message: "Deleted successfully" };
  } else {
    throw new Error("Failed to delete photo from the database");
  }
};

module.exports = deletePhoto;
