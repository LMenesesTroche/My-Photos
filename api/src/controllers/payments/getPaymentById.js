const { payments } = require("../../db.js");

const getPaymentByUserId = async (id_user) => {
  const userPayment = await payments.findOne({where:{id_user:id_user}});
  return userPayment;
};

module.exports = getPaymentByUserId;
