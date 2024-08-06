const { users } = require("../../db");

async function createUser(email, password) {
  const emailOnUse = await users.findOne({
    where: { email },
  });

  if (emailOnUse) {
    throw new Error("email already on use");
  } else {
    const createUserDb = await users.create({
      email,
      password,
    });
    return createUserDb;
  }
}

module.exports = createUser;
