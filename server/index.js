require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const verifyAndCreateDefaultUser = require("./initUser.js");

conn
  .sync({ alter: true }) // Cambiar a 'alter: true' en producción para evitar la pérdida de datos
  .then(async () => {
    // Llamar a verifyAndCreateDefaultUser después de sincronizar
    await verifyAndCreateDefaultUser();
    
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
