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

export const deletePhoto = (id_user, id_photo) => async (dispatch, getState) => {
  try {
    // Get the stored token from localStorage or another place
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authorization token found');
    }

    console.log("id user:",id_user,"idPhoto", id_photo,"token:",token)
    // Make the DELETE request with the authorization header
    const response = await axios.delete(
      `${rutaBack}/photos/delete`, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
        data: {
          id_user, id_photo, // Send the photoId in the request body if needed
        }
      }
    );

    // // Dispatch the delete action in Redux
    // dispatch({
    //   type: 'DELETE_PHOTO',
    //   payload: photoId,
    // });

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