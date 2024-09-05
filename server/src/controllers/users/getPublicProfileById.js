const { user } = require("../../db.js");

const getPublicProfileById = async (id) => {
  const publicProfile = await user.findOne({ where: {auth0Id:id}});
  return publicProfile;
};

module.exports = getPublicProfileById;
