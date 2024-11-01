const { Router } = require("express");
const getAllPayments = require("../controllers/payments/getAllPayments");
const savePayments = require("../controllers/payments/savePayment");
const forgivePaymentByUserId = require("../controllers/payments/forgivePayment");
const checkJwt = require("../../middleware");
const verifyAdmin = require("../../adminMiddleware");

const paymentsRoutes = Router();

paymentsRoutes.get("/all", checkJwt, verifyAdmin, async (req, res) => {
  try {
    const status = await getAllPayments();
    res.status(200).json(status);
  } catch (error) {
    console.log("Error en get all payments", error);
    res.status(500).json({ error: "Error fetching payments" });
  }
});

paymentsRoutes.post("/save-payment", async (req, res) => {
  try {
    //! Sería bueno verificar los datos en este punto
    const message = await savePayments(req);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error on create payment" });
  }
});

// Ruta protegida para perdonar pagos solo para administradores
paymentsRoutes.post("/forgive-user", checkJwt, verifyAdmin, async (req, res) => {
  try {
    const { auth0Id } = req.body;
    if (!auth0Id) {
      return res.status(400).json("Missing data");
    }
    //! Verificar que sea un auth0 id válido
    if (typeof auth0Id !== "string") {
      return res.status(400).json("Invalid data");
    }
    const message = await forgivePaymentByUserId(auth0Id);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error forgiving payment" });
  }
});

module.exports = paymentsRoutes;
