const bcrypt = require('bcrypt');
const { Users } = require("../../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verifyAccount = async (email, password) => {
    const theUser = await Users.findOne({
        where: { email }
    });

    if (!theUser) return { error: "The user does not exist" };

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const match = await bcrypt.compare(password, theUser.password);

    if (match) {
        // Genera un token JWT
        const token = jwt.sign({ email: theUser.email }, JWT_SECRET, { expiresIn: '1m' }); 
        return { message: "Login successfully", user: { email }, token };
    } else {
        return { error: "Incorrect password" };
    }
};

module.exports = verifyAccount;
