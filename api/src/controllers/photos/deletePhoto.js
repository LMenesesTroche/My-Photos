const { photos, user } = require("../../db");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deletePhoto = async ({ id_user, id_photo }) => {
  // Verificar si el usuario existe
  const foundUser = await user.findOne({
    where: { auth0Id: id_user },
  });

  if (!foundUser) {
    throw new Error("User not found");
  }

  // Buscar la foto asociada al usuario
  const findPhoto = await photos.findOne({
    where: { id_photos: id_photo, id_user: foundUser.id_user },
  });

  if (!findPhoto) {
    throw new Error("Photo not found or you are not the owner");
  }

  // Extraer el public_id de la URL de Cloudinary
  let cloudinaryPublicId;
  try {
    cloudinaryPublicId = findPhoto.highUrl.split("/upload/")[1].split("/").slice(1).join("/").split(".")[0];
    console.log(cloudinaryPublicId);
  } catch (error) {
    console.error("Error extracting Cloudinary public_id:", error);
    throw new Error("Failed to extract Cloudinary public_id");
  }

  // Intentar eliminar la foto de Cloudinary
  try {
    await cloudinary.uploader.destroy(cloudinaryPublicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error("Failed to delete photo from Cloudinary");
  }

  // Eliminar la foto de la base de datos
  try {
    const destroy = await photos.destroy({
      where: { id_photos: id_photo, id_user: foundUser.id_user },
    });

    if (!destroy) {
      throw new Error("Failed to delete photo from the database");
    }

    return { message: "Deleted successfully" };
  } catch (error) {
    console.error("Database deletion error:", error);
    throw new Error("Failed to delete photo from the database");
  }
};

module.exports = deletePhoto;