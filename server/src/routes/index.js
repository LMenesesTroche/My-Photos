const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const photosRoutes = require("./photosRoutes");

router.use("/users",userRoutes);

router.use("/photos",photosRoutes);

module.exports = router;

