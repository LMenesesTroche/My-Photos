const { Router } = require("express");

// const createUser = require("../controllers/users/createUser");
// const verifyAccount = require("../controllers/auth/verification");
// const authenticateToken = require("../controllers/auth/authenticateToken");
// const getNumber = require("../controllers/users/getNumber");

const findOrCreateUser = require("../controllers/users/findOrCreateUser");
const userRoutes = Router();

// userRoutes.post("/create", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Missing data" });
//     }

//     const message = await createUser(email, password);

//     res.status(200).json(message);
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// userRoutes.post("/verification", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Missing data" });
//     }

//     const message = await verifyAccount(email, password);

//     return res.status(200).json(message);
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

userRoutes.post('/api', async (req, res) => {
  try {
    const user = await findOrCreateUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error saving user' });
  }
});

// userRoutes.get("/getNumber",authenticateToken, getNumber);

module.exports = userRoutes;
