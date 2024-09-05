const { user } = require("../../db.js");

const getAllUsers = async () => {
  const allUsers = await user.findAll();
  return allUsers;
};

module.exports = getAllUsers;
