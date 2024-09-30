const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,  // Verifica el valor en el .env
    issuerBaseURL: process.env.AUTH0_DOMAIN,  // No debe tener un slash final
    tokenSigningAlg: 'RS256'  // El algoritmo de firma de los tokens en Auth0
});

module.exports = checkJwt;
