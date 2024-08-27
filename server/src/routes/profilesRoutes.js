const { Router } = require("express");
const uploadImagesDB = require("../controllers/profiles/uploadImagesDB");

const profilesRoutes = Router();

profilesRoutes.post("/uploadImage", async (req, res) => {
  try {
    const { idUser, url } = req.body;
    if (!idUser || !url) {
      return res.status(400).json({ error: "Missing data" });
    }
    const status = await uploadImagesDB({ idUser, url });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});


module.exports = profilesRoutes;
