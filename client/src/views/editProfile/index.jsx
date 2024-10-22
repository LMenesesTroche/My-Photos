import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegar
import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../../redux/actions/users"; // Acción para actualizar el perfil

const EditProfile = () => {
  const navigate = useNavigate(); // Hook para realizar la navegación programática
  const userPublicInfo = useSelector((state) => state.users.userPublicInfo); // Información actual del usuario

  // Estado local para manejar los datos del formulario
  const [name, setName] = useState("");


  // Prellenar los valores del formulario cuando se cargue el componente
  useEffect(() => {
    if (userPublicInfo) {
      setName(userPublicInfo.name);
      setBiography(userPublicInfo.biography || "");
      setIntroduction(userPublicInfo.introduction || "");
    }
  }, [userPublicInfo]);

  // Función para manejar la cancelación
  const handleCancel = () => {
    navigate(-1); // Redirige a la página anterior (perfil del usuario)
  };

  // Función para manejar la actualización del perfil
  const handleSave = () => {
    // Crea un objeto con los datos que deseas actualizar
    const updatedProfileData = {
      name,
      biography,
      introduction,
    };

    // Envía los datos al backend o a la acción de Redux para actualizar el perfil
    // dispatch(updateUserProfile(userPublicInfo.id, updatedProfileData)); // Aquí llamas a la acción de actualización

    // Después de guardar, redirigir al perfil del usuario
    navigate(`/profile/${userPublicInfo.id}`);
  };

  return (
    <div>
      <h1>Edit your Name:</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Actualiza el estado del nombre
        />
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
