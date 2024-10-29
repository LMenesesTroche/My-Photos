const { user } = require("../src/db");

const blockedMiddleware = async (req, res, next) => {
  const { auth0Id } = req.body;

  if (!auth0Id) throw new Error("No id provided");
  try {
    const userInfo = await user.findOne({ where: { auth0Id } });
    if (!userInfo) throw new Error("This user can not access.");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Error en blockedMiddleware" });
  }
};

module.exports = blockedMiddleware;
