const { photos, user } = require("../../db");

const deletePhoto = async ({ id_user, id_photo }) => {
  // Buscar el usuario basado en el id del Auth0
  const foundUser = await user.findOne({
    where: {
      auth0Id: id_user,
    },
  });

  // Si no se encuentra el usuario, lanzar un error
  if (!foundUser) {
    throw new Error("User not found");
  }

  // Buscar la foto por id y que pertenezca al usuario
  const findPhoto = await photos.findOne({
    where: {
      id_photos: id_photo, // Asegúrate de usar el campo correcto para el id de la foto
      id_user: foundUser.id_user, // Ahora usar `userId` correctamente
    },
  });

  // Si no se encuentra la foto o no pertenece al usuario, lanzar un error
  if (!findPhoto) {
    throw new Error("Photo not found or you are not the owner");
  }

  // Eliminar la foto si todas las validaciones anteriores son correctas
  const destroy = await photos.destroy({
    where: {
      id_photos: id_photo,
      id_user: foundUser.id_user, 
    },
  });

  // Confirmar eliminación
  if (destroy) {
    return { message: "Deleted successfully" };
  } else {
    throw new Error("Failed to delete photo");
  }
};

module.exports = deletePhoto;
