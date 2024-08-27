import axios from "axios";
import rutaBack from "./rutaBack";

export const GET_USERS = "REGISTER_SUCCESS";

export const uploadBack = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${rutaBack}/upload`);
      console.log(response);
    } catch (error) {
      console.log("Error en actions get all Users", error);
    }
  };
};
