const { payments, user } = require("../../db.js");

const savePayments = async (req) => {
  const { payerID, orderID, invoice, amount, status } = req.body;

  const userFound = await user.findOne({ where: { auth0Id: payerID } });

  if (!userFound) {
    throw new Error('Usuario no encontrado');
  }

  const nuevoPago = {
    id_user: userFound.id_user,
    id_payment: orderID,
    invoice:invoice,
    amount:amount,
    status:status,
    date: new Date(),
  };

  payments.create(nuevoPago); // En lugar de esto, guardarías el pago en tu base de datos real

  // Si el status del pago es COMPLETED, actualizar el campo hasPaid del usuario a true
  if (status === 'COMPLETED') {
    await user.update(
      { hasPaid: true }, // Actualiza el campo hasPaid a true
      { where: { id_user: userFound.id_user } } // Condición de búsqueda
    );
  }
  
  return nuevoPago;
};

module.exports = savePayments;
