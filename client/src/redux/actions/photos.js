import axios from "axios";
import rutaBack from "./rutaBack";

export const uploadBack = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${rutaBack}/photos/new`,data);
      console.log(response.data);
    } catch (error) {
      console.log("Error en actions get all Users", error);
    }
  };
};

