const { user } = require("../../db.js");

const hasPaid = async (userId) => {
  const userFound = await user.findOne({
    where: { auth0Id: userId }
  });

  if(!userFound){
    return 'User not found';
  }

  if (userFound.hasPaid === true) {
    return true;
  }
  return false
};

module.exports = hasPaid;
