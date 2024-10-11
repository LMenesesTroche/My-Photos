const { user } = require("../../db.js");

const changeProfilePicture = async ({ auth0Id, newUrl }) => {
  const userFound = await user.findOne({ where: { auth0Id } });
  if (!userFound) throw new Error("User not found on the data base");

  if (userFound) {
    userFound.picture = newUrl;
    userFound.save();
  }

  return { message: "Profile changed successfully", userFound };
};

module.exports = changeProfilePicture;
