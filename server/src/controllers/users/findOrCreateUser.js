const { Users } = require("../../db");

const findOrCreateUser  = async (auth0User) => {
    const { sub: auth0Id, email, name, picture } = auth0User;

    try {
      let [user, created] = await Users.findOrCreate({
        where: { auth0Id },
        defaults: { email, name, picture },
      });
  
      if (!created) {
        user = await user.update({ email, name, picture });
      }
  
      return user;
    } catch (error) {
      console.error('Error saving user to database:', error);
      throw error;
    }
};

module.exports = findOrCreateUser ;
