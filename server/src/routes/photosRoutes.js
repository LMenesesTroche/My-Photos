const { Router } = require("express");
const postPhoto = require("../controllers/photos/postPhoto");
const deletePhoto = require("../controllers/photos/deletePhoto");
const checkJwt = require("../../middleware"); // Importa el middleware que verificará el token

const photosRoutes = Router();

photosRoutes.post("/new", async (req, res) => {
    try {
        const { id_user, highUrl, lowUrl } = req.body;

        if (!id_user || !highUrl || !lowUrl) {
            return res.status(400).json({ error: "Missing data" });
        }
        if (typeof id_user !== "string") {
            return res.status(400).json({ error: "Id user must be a string" });
        }
        if (typeof highUrl !== "string") {
            return res.status(400).json({ error: "highUrl must be a string" });
        }
        if (typeof lowUrl !== "string") {
            return res.status(400).json({ error: "lowUrl must be a string" });
        }

        const message = await postPhoto({ id_user, highUrl, lowUrl });
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error on create photo" });
    }
});

photosRoutes.delete("/delete", checkJwt, async (req, res) => {
    try {
        const { id_user, id_photo } = req.body;

        // Verifica el token JWT para asegurarse de que el usuario está autenticado
        const userIdFromToken = req.auth.id; // Extrae el ID del usuario del payload del token

        if (!id_user || !id_photo) {
          console.log("Missing data")
            return res.status(400).json({ error: "Missing data" });
        }
        if (typeof id_user !== "string" || typeof id_photo !== "string") {
          console.log("Invalid data")
            return res.status(400).json({ error: "Invalid data type" });
        }

        // Asegúrate de que el usuario autenticado sea el dueño de la foto
        if (id_user !== userIdFromToken) {
          console.log("user not authorize to delete this photo")
            return res
                .status(403)
                .json({ error: "Not authorized to delete this photo" });
        }

        const message = await deletePhoto({ id_user, id_photo });
        res.status(200).json(message);
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({ error: "Error deleting photo" });
    }
});

module.exports = photosRoutes;
