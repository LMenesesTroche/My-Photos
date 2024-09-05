const { Router } = require("express");
const postPhoto = require("../controllers/photos/postPhoto");

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

module.exports = photosRoutes;
