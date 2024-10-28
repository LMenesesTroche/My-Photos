const { user } = require("../../db.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateProfilePicture = async ({ auth0Id, newUrl }) => {
  const userFound = await user.findOne({ where: { auth0Id } });
  if (!userFound) throw new Error("User not found in the database");

  const previousPictureUrl = userFound.picture; // Guarda la URL anterior
  userFound.picture = newUrl; // Actualiza la URL con la nueva
  await userFound.save(); // Asegúrate de que `save` se complete antes de continuar

  // Extraer y eliminar la imagen anterior de Cloudinary
  let cloudinaryPublicId;
  if (previousPictureUrl) {
    try {
      cloudinaryPublicId = previousPictureUrl
        .split("/upload/")[1]
        .split("/")
        .slice(1)
        .join("/")
        .split(".")[0];
    } catch (error) {
      console.error("Error extracting Cloudinary public_id:", error);
    }
  }

  if (cloudinaryPublicId) {
    try {
      await cloudinary.uploader.destroy(cloudinaryPublicId);
    } catch (error) {
      console.error("Cloudinary deletion error:", error);
    }
  }

  return { message: "Success", picture: userFound.picture };
};

module.exports = updateProfilePicture;
