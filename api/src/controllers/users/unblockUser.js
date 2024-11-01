const { user } = require("../../db.js");

const unblockUser = async (userId) => {
  const userFound = await user.findOne({
    where: { auth0Id: userId }
  });

  if (!userFound) throw new Error("User not found on the data base");

  userFound.hasBeenBlocked = false;
  userFound.save();

  return {message:"The user has been unblocked succesfully"}
};

module.exports = unblockUser;
