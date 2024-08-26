const { Users } = require("../../db");

const createFakeUser  = async (data) => {
  const { sub, email } = data; //sacamos la info 
  const auth0Id = sub;

  const nuevoUsuario = await Users.create({ auth0Id, email, name, picture});

  return nuevoUsuario
};


module.exports = createFakeUser ;
