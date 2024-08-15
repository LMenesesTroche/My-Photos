import rutaBack from "./rutaBack";
import axios from "axios";
export const LOGIN_SUCCESS = "REGISTER_SUCCESS";

//This is the action for create an user
export const register = (formData) => async (dispatch) => {
  const endpoint = `${rutaBack}/users/create`;
  try {
    const response = await axios.post(endpoint, formData);
    if (response.data.id) {
      window.alert("Register succesfully");
    } else {
      window.alert(response.data.message);
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

//this is the verification and login for the user
export const login = (formData) => async (dispatch) => {
  const endpoint = `${rutaBack}/users/verification`;
  try {
    const response = await axios.post(endpoint, formData);

    if (response.data.message) {
      window.alert(response.data.message);
      
      // Guardamos el token en localStorage
      localStorage.setItem("token", response.data.token);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    } else {
      window.alert(response.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
