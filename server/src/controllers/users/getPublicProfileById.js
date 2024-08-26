const { Users } = require("../../db.js");

const getPublicProfileById = async (id) => {
  const publicProfile = await Users.findOne({ where: {auth0Id:id}});
  return publicProfile;
};

module.exports = getPublicProfileById;
