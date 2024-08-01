const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/photos", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
      {
        params: {
          prefix: "photos", // Estoy sacando las fotos de la carpeta photos
          max_results: 50, //Devuelve maximo 50  resultados porpeticion
        },
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
      }
    );

    // Transformar datos para incluir URLs de baja y alta resolución
    const transformedPhotos = response.data.resources.map((photo) => ({
      low_res_url: photo.secure_url.replace(
        "/upload/",
        "/upload/w_500,h_500,c_limit,q_70/"
      ),
      high_res_url: photo.secure_url,
    }));

    res.json(transformedPhotos);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
