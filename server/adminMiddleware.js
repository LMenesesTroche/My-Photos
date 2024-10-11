const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar si el usuario es administrador
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    next(); // Usuario es admin, continuar con la solicitud
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports =  verifyAdmin ;
