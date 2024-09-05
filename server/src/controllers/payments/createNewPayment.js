const { payments } = require("../../db");

const createNewPayment  = async ({ id_user, amount}) => {
  const newPayment = await payments.create({ id_user, amount });

  return newPayment
};


module.exports = createNewPayment;
