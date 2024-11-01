const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para autenticar el token JWT
const checkJwt = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided")
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Failed to autenticate token")
      }
  
      req.auth = decoded; // Almacena el payload en req.auth
      next(); // Pasa al siguiente middleware o ruta
    });
  };



module.exports =  checkJwt ;
