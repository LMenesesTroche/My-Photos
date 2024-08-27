const { Users } = require("../../db");

const uploadImagesDB = async ({ idUser, url }) => {
  try {
    const existingUser = await Users.findOne({
      where: {
        auth0Id: idUser,
      },
    });

    if (existingUser) {
      let updatedPhotos = [...(existingUser.photos || [])];
      updatedPhotos.push(url);
      // Actualizar el usuario con el nuevo array de fotos
      await existingUser.update({ photos: updatedPhotos });

      return { status: "The URL was saved successfully" };
    } else {
      return { status: "User not found" };
    }
  } catch (error) {
    console.error("Error updating user photos:", error);
    return { status: "Error updating user photos" };
  }
};

module.exports = uploadImagesDB;
