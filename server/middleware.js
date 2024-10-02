const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de usar la misma clave que utilizaste al crear el JWT

const checkJwt = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }

        req.auth = decoded; // Almacena el payload en el objeto de la solicitud para usarlo más tarde
        next(); // Llama al siguiente middleware o ruta
    });
};

module.exports = checkJwt;
