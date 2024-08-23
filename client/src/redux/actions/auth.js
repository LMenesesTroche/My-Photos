import rutaBack from "./rutaBack";
import axios from "axios";
export const LOGIN_SUCCESS = "REGISTER_SUCCESS";
export const LOGOUT = "LOGOUT";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";

export const getUserNumber = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(`${rutaBack}/users/getNumber`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //Seteamos el numero en localstorage si nos autorizaron 
      localStorage.setItem("number", response.data);

    } catch (error) {
      console.log(error);
    }
  }
};