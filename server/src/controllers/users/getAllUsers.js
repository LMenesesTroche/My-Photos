const { Users } = require("../../db.js");

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  return allUsers;
};

module.exports = getAllUsers;
