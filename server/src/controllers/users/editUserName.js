const { user } = require("../../db.js");

const editUserName = async ({ auth0Id, newUserName }) => {
  const userFound = await user.findOne({ where: { auth0Id } });
  if (!userFound) throw new Error("User not found on the data base");

  const nameOnUse = await user.findOne({ where: { name: newUserName } });
  if (nameOnUse) {
    console.log("Error: Username already in use"); // Mensaje en consola
    return { error: "Username already in use" }; // Respuesta con el error
  }

  userFound.name = newUserName;
  userFound.save();

  return { message: "Username updated successfully", userFound };
};

module.exports = editUserName;
