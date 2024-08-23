// const bcrypt = require('bcrypt');
// const { Users } = require("../../db");
// const saltRounds = 10;

// async function createUser(email, password) {
//   try {
//     // Verifica si el email ya está en uso
//     const emailOnUse = await Users.findOne({
//       where: { email },
//     });

//     if (emailOnUse) {
//       return { message: "Email already in use" };
//     }

//     // Hashea la contraseña antes de almacenarla
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Crea un nuevo usuario en la base de datos
//     const createUserDb = await Users.create({
//       email,
//       password: hashedPassword,
//     });

//     return { message: "User created successfully", user: createUserDb };
//   } catch (error) {
//     // Manejo de errores
//     console.error("Error creating user:", error);
//     return { error: "An error occurred while creating the user" };
//   }
// }

// module.exports = createUser;
