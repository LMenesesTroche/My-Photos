const { user } = require("../../db.js");

const blockUser = async (userId) => {
  const userFound = await user.findOne({
    where: { auth0Id: userId }
  });

  if (!userFound) throw new Error("User not found on the data base");

  userFound.hasBeenBlocked = true;
  userFound.save();

  return {message:"The user has been blocked succesfully"}
};

module.exports = blockUser;
