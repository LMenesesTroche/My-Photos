const { Payments } = require("../../db");

const getAllPayments = async () => {
  const allPayments = await Payments.findAll();
  return allPayments;
};

module.exports = getAllPayments;
