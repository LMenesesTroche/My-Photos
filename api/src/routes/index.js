const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const paymentsRoutes = require("./paymentsRoutes");
const photosRoutes = require("./photosRoutes");

router.use("/users",userRoutes);

router.use("/payments",paymentsRoutes);

router.use("/photos", photosRoutes);

module.exports = router;

