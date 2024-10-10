const { user } = require("../../db.js");

const forgivePaymentByUserId = async (auth0Id) => {
  const userById = await user.findOne({where:{auth0Id}});

  if(!userById) throw new Error('User not found');
  if(userById.hasPaid == true) return {message:"The user already paid"};
  userById.hasPaid = true;

  userById.save();
  return {message:"Forgiven succesfully"};
};

module.exports = forgivePaymentByUserId;
