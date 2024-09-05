const { Router } = require("express");
const getAllPayments = require("../controllers/payments/getAllPayments");
const createNewPayment = require("../controllers/payments/createNewPayment");

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

paymentsRoutes.post("/new", async (req, res) => {
  try {
    const { id_user, amount } = req.body;

    if(!id_user||!amount){
      return res.status(400).json({ error: "Missing data" });
    }
    if(typeof id_user !== "string"){
      return res.status(400).json({ error: "Id user must be a string" });
    }
    if(typeof amount !== "number"){
      return res.status(400).json({ error: "amount must be a number" });
    }
    const message = await createNewPayment({ id_user, amount});
    res.status(200).json(message);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error on create payment"});
  }
});

module.exports = paymentsRoutes;
