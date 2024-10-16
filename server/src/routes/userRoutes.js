const { Router } = require("express");
const findOrCreateUser = require("../controllers/users/findOrCreateUser");
const getAllUsers = require("../controllers/users/getAllUsers");
const getPublicProfileById = require("../controllers/users/getPublicProfileById");
const hasPaid = require("../controllers/users/hasPaid");
const changeProfilePicture = require("../controllers/users/changeProfilePicture");
const checkJwt = require("../../middleware");
const verifyAdmin = require("../../adminMiddleware");
const blockUser = require("../controllers/users/blockUser");
const unblockUser = require("../controllers/users/unblockUser");

const userRoutes = Router();

userRoutes.post("/api", async (req, res) => {
  try {
    const { sub } = req.body;

    if (!sub) {
      return res.status(400).json({ error: "Missing data" });
    }

    const response = await findOrCreateUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
    console.log("error en create user", error);
  }
});

userRoutes.get("/getAll", async (req, res) => {
  try {
    const message = await getAllUsers();
    res.status(200).json(message);
  } catch (error) {
    console.error("Error en la ruta getAllUsers:", error.message);
    res.status(500).json({ error: error.message });
  }
});

userRoutes.get("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) {
      return res.status(400).json("Missing data");
    }
    if (typeof idUser !== "string") {
      return res.status(400).json("Invalid data");
    }
    const message = await getPublicProfileById(idUser);
    res.status(200).json(message);
  } catch (error) {
    console.error("Error en la ruta get public profile by id:", error.message);
    res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/hasPaid", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const response = await hasPaid(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error checking payment status" });
  }
});

userRoutes.post("/change-profile-picture", async (req, res) => {
  try {
    const { auth0Id, newUrl } = req.body;

    if (!auth0Id || !newUrl) {
      throw new Error("Missing data");
    }
    if (typeof auth0Id !== "string" || typeof newUrl !== "string") {
      throw new Error("Invalid data");
    }

    const response = await changeProfilePicture({ auth0Id, newUrl });
    res.status(200).json(response);
  } catch (error) {
    console.error("Error en la ruta change profile picture:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta protegida para blockear solo para administradores
userRoutes.post("/block-user", checkJwt, verifyAdmin, async (req, res) => {
  console.log("llego hasta aqui")
  try {
    const { userId } = req.body;

    if (!userId) throw new Error("Missing data");    
    if (typeof userId !== "string") throw new Error("Invalid data");

    const message = await blockUser(userId);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error block user routes" });
  }
});

// Ruta protegida para blockear solo para administradores(Desbloquear usuario)
userRoutes.post("/unblock-user", checkJwt, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) throw new Error("Missing data");    
    if (typeof userId !== "string") throw new Error("Invalid data");

    const message = await unblockUser(userId);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error block user routes" });
  }
});

module.exports = userRoutes;
