const { Users } = require("../../db.js");

const hasPaid = async (userId) => {
  const user = await Users.findOne({
    where: { auth0Id: userId }
  });

  if (user && user.hasPaid === true) {
    return true;
  }

  return false;
};

module.exports = hasPaid;
