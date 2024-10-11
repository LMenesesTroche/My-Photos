const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para autenticar el token JWT
const checkJwt = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Failed to authenticate token" });
      }
  
      req.auth = decoded; // Almacena el payload en req.auth
      next(); // Pasa al siguiente middleware o ruta
    });
  };



module.exports =  checkJwt ;
