const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const photosRoutes = require("./photosRoutes");
const profilesRoutes = require("./profilesRoutes");

router.use("/users",userRoutes);

router.use("/photos",photosRoutes);

router.use("/profiles",profilesRoutes);


module.exports = router;

