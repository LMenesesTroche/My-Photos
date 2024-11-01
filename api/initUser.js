const { user, photos } = require("./src/db");
// const jwt = require("jsonwebtoken");

const DEFAULT_USER = {
  auth0Id: "google-oauth2|114723902309083514607",
  email: "lucasmenesestroche@gmail.com",
  name: "Lucas Meneses",
  picture: "https://res.cloudinary.com/decbwosgj/image/upload/v1730477244/photos/h9pknfsr7q3nq00z2v4g.jpg",
  hasPaid: true, // Define hasPaid como true
};

// Lista de fotos a añadir si el usuario no existe
const DEFAULT_PHOTOS = [
    {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847469/photos/1706281340228_s1gpiq.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847469/photos/1706281340228_s1gpiq.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847794/photos/1721846334013_zvrkjb.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847794/photos/1721846334013_zvrkjb.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847465/photos/1721846334388_l43xrk.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847465/photos/1721846334388_l43xrk.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848061/photos/1721846334499_hikyt7.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848061/photos/1721846334499_hikyt7.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847461/photos/1721846334945_hgceez.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847461/photos/1721846334945_hgceez.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848070/photos/1721846334983_n4jaxr.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848070/photos/1721846334983_n4jaxr.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848070/photos/1721846335315_yoiu0l.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848070/photos/1721846335315_yoiu0l.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846335580_t1wi74.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846335580_t1wi74.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847470/photos/1721846335852_axlkyx.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847470/photos/1721846335852_axlkyx.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847468/photos/1721846335948_inbxtv.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847468/photos/1721846335948_inbxtv.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847459/photos/1721846335987_wymo22.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847459/photos/1721846335987_wymo22.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847467/photos/1721846336002_aggase.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847467/photos/1721846336002_aggase.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846336088_m3fjie.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846336088_m3fjie.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847461/photos/1721846336495_cu7hhq.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847461/photos/1721846336495_cu7hhq.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721848074/photos/1721846336670_tjkhpm.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721848074/photos/1721846336670_tjkhpm.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721847469/photos/1721846337725_ys4yiz.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721847469/photos/1721846337725_ys4yiz.jpg",
      },
      {
        low_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/w_500,h_500,c_limit,q_70/v1721838977/photos/20240715-_DSC2423_col4p3.jpg",
        high_res_url:
          "https://res.cloudinary.com/decbwosgj/image/upload/v1721838977/photos/20240715-_DSC2423_col4p3.jpg",
      },
];

// Función para verificar y crear usuario
const verifyAndCreateDefaultUser = async () => {
  try {
    // Verificar si el usuario existe
    let existingUser = await user.findOne({
      where: { auth0Id: DEFAULT_USER.auth0Id },
    });

    if (!existingUser) {
      // Crear el usuario si no existe
      existingUser = await user.create(DEFAULT_USER);

      // Agregar las fotos al usuario recién creado
      for (const photoData of DEFAULT_PHOTOS) {
        await photos.create({
          highUrl: photoData.high_res_url,
          lowUrl: photoData.low_res_url,
          id_user: existingUser.id_user,
        });
      }
      console.log("Usuario y fotos de perfil predeterminadas creados exitosamente.");
    } else {
      console.log("El usuario ya existe, no es necesario crear de nuevo.");
    }
  } catch (error) {
    console.error("Error al verificar o crear usuario predeterminado:", error);
  }
};

module.exports = verifyAndCreateDefaultUser;
