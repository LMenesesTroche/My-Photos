const { Router } = require("express");
// Asumo que `createUser` es una función controladora que debes importar y usar después
const createUser = require("../controllers/users/createUser");
const verifyAccount = require("../controllers/auth/verification");

const userRoutes = Router();

userRoutes.post("/create", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing data" });
        }

        const message = await createUser(email, password);

        res.status(200).json(message);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
    
});

userRoutes.get("/verification", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing data" });
        }

        const message = await verifyAccount(email, password);

        res.status(200).json(message);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
    
});

module.exports = userRoutes;
