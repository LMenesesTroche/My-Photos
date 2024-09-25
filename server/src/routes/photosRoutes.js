const { Router } = require("express");
const postPhoto = require("../controllers/photos/postPhoto");
const deletePhoto = require("../controllers/photos/deletePhoto");
const checkJwt= require("../../middleware");

const photosRoutes = Router();

photosRoutes.post("/new", async (req, res) => {
  try {
    const { id_user, highUrl, lowUrl } = req.body;

    if(!id_user||!highUrl||!lowUrl){
      return res.status(400).json({ error: "Missing data" });
    }
    if(typeof id_user !== "string"){
      return res.status(400).json({ error: "Id user must be a string" });
    }
    if(typeof highUrl !== "string"){
      return res.status(400).json({ error: "amount must be a number" });
    }
    if(typeof lowUrl !== "string"){
      return res.status(400).json({ error: "amount must be a number" });
    }
    const message = await postPhoto({ id_user, highUrl, lowUrl });
    res.status(200).json(message);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error on create photo"});
  }
});

photosRoutes.delete("/delete", checkJwt, async (req, res) => {
  try {
    const { id_user, id_photo } = req.body;

    // Verifica que el id_user coincide con el usuario autenticado
    const userIdFromToken = req.user.sub; // Obtén el id del usuario desde el token

    if (!id_user || !id_photo) {
      return res.status(400).json({ error: "Missing data" });
    }
    if (typeof id_user !== "string" || typeof id_photo !== "string") {
      return res.status(400).json({ error: "Invalid data type" });
    }

    if (id_user !== userIdFromToken) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const message = await deletePhoto({ id_user, id_photo });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ error: "Error deleting photo" });
  }
});


module.exports = photosRoutes;
