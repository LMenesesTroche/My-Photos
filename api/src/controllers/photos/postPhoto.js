const { photos, user } = require("../../db");

const postPhoto = async ({ id_user, highUrl, lowUrl }) => {

  const foundUser = await user.findOne({
    where: {
      auth0Id:id_user
    },
  });

  if (!foundUser) {
    throw new Error("User not found");
  }

  // Crea la foto y asocia al usuario utilizando id_user
  const newPhoto = await photos.create({
    highUrl,
    lowUrl,
    id_user: foundUser.id_user, // Usar 'id_user' como clave foránea
  });
  
  return {message:"success"};
};

module.exports = postPhoto;