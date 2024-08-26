import rutaBack from "./rutaBack";
import axios from "axios";

export const GET_USERS = "REGISTER_SUCCESS";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${rutaBack}/users/getAll`);
      console.log(response);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error en actions get all Users", error);
    }
  };
};
