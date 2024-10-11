const { user } = require("../../db");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET; // Ensure to use a secure key in production
const ADMIN_AUTH0_ID = process.env.ADMIN_AUTH0_ID;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const findOrCreateUser = async (data) => {
  const { sub, email, name, picture } = data; // Extract necessary info
  const auth0Id = sub;

  // Check if a user with the same auth0Id already exists
  const existingUser = await user.findOne({
    where: {
      auth0Id,
    },
  });

  let token;

  // Special condition for admin user
  if (auth0Id === ADMIN_AUTH0_ID && email === ADMIN_EMAIL) {
    // Generate a special admin token
    token = jwt.sign({ id: auth0Id, role: 'admin' }, JWT_SECRET, {
      expiresIn: "2h", // Admin token expires in 2 hours
    });
  } else {
    // Generate a standard token for regular users
    token = jwt.sign({ id: auth0Id }, JWT_SECRET, {
      expiresIn: "1h", // Expires in 1 hour
    });
  }

  if (existingUser) {
    return { message: "The account already exists", token };
  }

  // Create a new user if none exists
  const nuevoUsuario = await user.create({ auth0Id, email, name, picture });

  return { nuevoUsuario, token }; // Return the new user and token
};

module.exports = findOrCreateUser;
