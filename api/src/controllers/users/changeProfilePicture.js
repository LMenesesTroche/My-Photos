const { user } = require("../../db");
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

//https://res.cloudinary.com/decbwosgj/image/upload/v1730476915/photos/puqocjh5jpodvhpll4po.jpg
  let cloudinaryPublicId;
  if(previousPictureUrl){
    try {
      cloudinaryPublicId = previousPictureUrl.split("/upload/")[1].split("/").slice(1).join("/").split(".")[0];
      console.log(cloudinaryPublicId);
    } catch (error) {
      console.error("Error extracting Cloudinary public_id:", error);
      throw new Error("Failed to extract Cloudinary public_id");
    }
  }

  try {
    await cloudinary.uploader.destroy(cloudinaryPublicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error("Failed to delete photo from Cloudinary");
  }

  return { message: "Success", picture: userFound.picture };
};

module.exports = updateProfilePicture;
