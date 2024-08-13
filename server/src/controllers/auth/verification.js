const { Users } = require("../../db");
const { sequelize } = require("../../db");

const verifyAccount = async (email, password) => {
    const theUser = await Users.findOne({
        where: { email }
    });

    if(!theUser) throw new Error("No account");

    if(theUser.password === password){
        return {message:"Login succesfully"}
    }else{
        return {message:"Incorrect password"}
    }
};

module.exports = verifyAccount;