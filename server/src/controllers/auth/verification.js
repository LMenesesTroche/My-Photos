const { user } = require("../../db.js");

const verifyAccount = async (email, password) => {
    const theUser = await user.findOne({
        where: { email }
    });

    if(!theUser) throw new Error("No account");

    if(theUser.password === password){
        return "Login succesfull"
    }else{
        return "Incorrect password"
    }
};

module.exports = verifyAccount;