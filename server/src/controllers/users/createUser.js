const { Users } = require("../../db");
const { sequelize } = require("../../db");

async function createUser(email, password) {

  const emailOnUse = await Users.findOne({
    where: { email },
  });

  if (emailOnUse) {
    return {message:"Email already on use"}
  } else {
    const createUserDb = await Users.create({
      email,
      password,
    });
    return createUserDb;
  }
}

module.exports = createUser;
