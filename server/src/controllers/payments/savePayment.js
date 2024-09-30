const { payments } = require("../../db.js");

const savePayments = async (req) => {
  const { payerID, orderID, invoice, amount, status } = req.body;

  const nuevoPago = {
    id_user: payerID,
    id_payment: orderID,
    invoice:invoice,
    amount:amount,
    status:status,
    date: new Date(),
  };

  payments.create(nuevoPago); // En lugar de esto, guardarías el pago en tu base de datos real
  return nuevoPago;
};

module.exports = savePayments;
