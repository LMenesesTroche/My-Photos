// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;


// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // El token está en el formato "Bearer TOKEN"

//     if (token == null) return res.sendStatus(401); // Si no hay token, retorna un error 401 (no autorizado)

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Si hay un error en la verificación, retorna un error 403 (prohibido)
//         req.user = user; // Guarda la información del usuario en la solicitud
//         next(); // Continua con la ejecución
//     });
// };

// module.exports = authenticateToken;
