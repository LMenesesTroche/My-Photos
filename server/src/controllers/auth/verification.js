const { Users } = require("../../db");
const jwt = require('jsonwebtoken');
const secret = "yourSecretKey"; // Deberías almacenar esto en una variable de entorno segura

const verifyAccount = async (email, password) => {
    const theUser = await Users.findOne({
        where: { email }
    });

    if(!theUser) return {error:"The user does not exist"};

    if(theUser.password === password){
        // Genera un token JWT
        const token = jwt.sign({ email: theUser.email }, secret, { expiresIn: '1h' }); // Expira en 1 hora
        return {message:"Login succesfully",user:{email},token};
    }else{
        return {error:"Incorrect password"}
    }
};

module.exports = verifyAccount;