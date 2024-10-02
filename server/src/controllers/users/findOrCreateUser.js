const { user } = require("../../db");
const jwt = require("jsonwebtoken"); // Importar jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de usar una clave segura en producción

const findOrCreateUser = async (data) => {
  const { sub, email, name, picture } = data; // Sacamos la info
  const auth0Id = sub;
  console.log("Esto es auth0Id", auth0Id);
  // Verificar si ya existe un usuario con el mismo auth0Id
  const existingUser = await user.findOne({
    where: {
      auth0Id,
    },
  });

  //todo Creo que a aqui esta el error
  // Generar el token JWT siempre con el auth0Id
  const token = jwt.sign({ id: auth0Id }, JWT_SECRET, {
    expiresIn: "1h", // Expira en 1 hora
  });

  // console.log("Este es el token que se genera desde el back:",token)

  if (existingUser) {
    return { message: "The account already created", token };
  }

  const nuevoUsuario = await user.create({ auth0Id, email, name, picture });

  return { nuevoUsuario, token }; // Retornar el nuevo usuario y el token
};

module.exports = findOrCreateUser;
