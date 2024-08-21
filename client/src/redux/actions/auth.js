import rutaBack from "./rutaBack";
import axios from "axios";
export const LOGIN_SUCCESS = "REGISTER_SUCCESS";
export const LOGOUT = "LOGOUT";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";

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
    } else {
      window.alert(response.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const logout = () => {
//   return {
//     type: 'LOGOUT',
//   };
// };

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