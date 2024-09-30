import rutaBack from "./rutaBack";
import axios from "axios";

export const GET_USERS = "GET_USERS";
export const USER_PUBLIC_INFO = "USER_PUBLIC_INFO";
export const DELETE_PHOTO = "DELETE_PHOTO";
export const USER_HAS_PAID = "USER_HAS_PAID";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${rutaBack}/users/getAll`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error en actions get all Users", error);
    }
  };
};

export const getUserInfoById = (id) => {
  return async (dispatch) => {
    try{
      let response = await axios.get(`${rutaBack}/users/${id}`);
      return dispatch({
        type: USER_PUBLIC_INFO,
        payload: response.data,
      });
    }catch(error){
      console.log("error en actions get user by id", error)
    }
  }
}

// Acción para eliminar una foto
export const deletePhoto = (photoId) => async (dispatch, getState) => {
  try {

    const token = localStorage.getItem('authToken'); // Recupera el token del localStorage
    console.log("Token  de local:", token); // Verificar si el token es correcto
    
    const response = await axios.delete(`${rutaBack}/photos/delete`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        id_user: getState().users.userPublicInfo.auth0Id, // Usa el id del usuario actual
        id_photo: photoId,
      }
    });

    // Actualiza el estado después de eliminar la foto
    dispatch({
      type: DELETE_PHOTO,
      payload: photoId,
    });

  } catch (error) {
    console.error('Error deleting photo:', error);
  }
};

export const userHasPaidById = (id) => {
  return async (dispatch) => {
    try{
      let response = await axios.post(`${rutaBack}/users/hasPaid`,{userId:id});
      // console.log("Este es el response del back:",response.data)
      return dispatch({
        type: USER_HAS_PAID,
        payload: response.data,
      });
      
    }catch(error){
      console.log("error en actions get user by id", error)
    }
  }
}