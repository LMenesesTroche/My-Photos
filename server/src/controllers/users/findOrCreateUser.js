const { user } = require("../../db");

const findOrCreateUser  = async (data) => {
  const { sub, email, name, picture } = data; //sacamos la info 
  const auth0Id = sub;
  // Verificar si ya existe una marca con el mismo nombre y dirección
  const existingUser = await user.findOne({
    where: {
      auth0Id,
    },
  });

  if (existingUser) {
    return ("The account already created");
  }

  const nuevoUsuario = await user.create({ auth0Id, email, name, picture});

  return nuevoUsuario
};


module.exports = findOrCreateUser ;
