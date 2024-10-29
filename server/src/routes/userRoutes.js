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
const editUserName = require("../controllers/users/editUserName");
const blockedMiddleware = require("../blockedMiddleware");

const userRoutes = Router();

//Para guardar un nuevo usuario en la DB
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

//Trae a todos los usuarios
userRoutes.get("/getAll", async (req, res) => {
  try {
    const message = await getAllUsers();
    res.status(200).json(message);
  } catch (error) {
    console.error("Error en la ruta getAllUsers:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//Trae la info especifica de un usuario
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

//Verifica que haya pagado
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

// Ruta protegida para desblockear solo para administradores(Desbloquear usuario)
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

//para cambiar el nombre de usuario
userRoutes.post("/update-username", checkJwt , blockedMiddleware,async (req, res) => {
  try {
    const { auth0Id, newUserName } = req.body;

    if (!auth0Id || !newUserName) {
      throw new Error("Missing data");
    }

    //!Verificar que el nuevo nombre no sea demasiado grande
    if (typeof auth0Id !== "string" || typeof newUserName !== "string") {
      throw new Error("Invalid data");
    }

    const response = await editUserName({ auth0Id, newUserName });

    if (response.error) {
      // Enviar mensaje de error al frontend si el nombre ya está en uso
      return res.status(200).json({ error: response.error });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en la ruta change userName:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRoutes;
