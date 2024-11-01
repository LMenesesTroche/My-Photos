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

  const previousPictureUrl = userFound.picture; // Guarda la URL anterior, puede ser undefined si no tiene foto previa
  userFound.picture = newUrl; // Actualiza la URL con la nueva
  await userFound.save(); // Guarda los cambios en la base de datos

  // Si no hay una URL de imagen previa, salta la eliminación
  if (previousPictureUrl) {
    try {
      // Extrae el public_id solo si `previousPictureUrl` tiene valor
      const cloudinaryPublicId = previousPictureUrl
        .split("/upload/")[1]
        .split("/")[1]
        .split(".")[0];

      await cloudinary.uploader.destroy(cloudinaryPublicId);
    } catch (error) {
      console.error("Error extracting or deleting Cloudinary public_id:", error);
    }
  }

  return { message: "Success", picture: userFound.picture };
};

module.exports = updateProfilePicture;
