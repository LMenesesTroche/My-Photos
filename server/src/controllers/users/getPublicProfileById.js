const { user, photos } = require("../../db.js");

const getPublicProfileById = async (id) => {
  // Busca al usuario y sus fotos relacionadas
  const publicProfile = await user.findOne({
    where: { auth0Id: id },
    include: [
      {
        model: photos, // Incluye el modelo de fotos
        attributes: ['id_photos', 'lowUrl', 'highUrl'], // Selecciona los atributos que deseas obtener de las fotos
      },
    ],
  });

  return publicProfile;
};

module.exports = getPublicProfileById;
