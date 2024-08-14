const { Users } = require("../../db");
const { sequelize } = require("../../db");

const verifyAccount = async (email, password) => {
    const theUser = await Users.findOne({
        where: { email }
    });

    if(!theUser) return {error:"The user does not exist"};

    if(theUser.password === password){
        return {message:"Login succesfully",user:{email,password}}
    }else{
        return {error:"Incorrect password"}
    }
};

module.exports = verifyAccount;