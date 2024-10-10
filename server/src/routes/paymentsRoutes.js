const { Router } = require("express");
const getAllPayments = require("../controllers/payments/getAllPayments");
const savePayments = require("../controllers/payments/savePayment");
const forgivePaymentByUserId = require("../controllers/payments/forgivePayment");

const paymentsRoutes = Router();

paymentsRoutes.get("/all", async (req, res) => {
  try {    
    const status = await getAllPayments();
    res.status(200).json(status);
  } catch (error) {
    console.log("Error en get all payments",error)
    res.status(500).json({ error: "Error paying routes" });
  }
});

paymentsRoutes.post("/save-payment", async (req, res) => {
  try {
    //!Seria bueno verificar los datos en este punto

    const message = await savePayments(req);
    res.status(200).json(message);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error on create payment"});
  }
});

paymentsRoutes.post("/forgive-user", async (req, res) => {
  try {
    const { auth0Id } = req.body;
    if(!auth0Id){
      return res.status(400).json("Missing data");
    }
    //!Verificar que sea un auth0 id valido
    if(typeof auth0Id !== "string"){
      return res.status(400).json("Invalid data");
    }
    const message = await forgivePaymentByUserId(auth0Id);
    res.status(200).json(message);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error on create payment"});
  }
});

module.exports = paymentsRoutes;
