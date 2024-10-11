const { Router } = require("express");
const findOrCreateUser = require("../controllers/users/findOrCreateUser");
const getAllUsers = require("../controllers/users/getAllUsers");
const getPublicProfileById = require("../controllers/users/getPublicProfileById");
const hasPaid = require("../controllers/users/hasPaid");
const changeProfilePicture = require("../controllers/users/changeProfilePicture");

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

module.exports = userRoutes;
