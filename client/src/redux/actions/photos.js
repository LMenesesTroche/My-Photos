import axios from "axios";
import rutaBack from "./rutaBack";
import { toast } from "react-toastify";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify

export const uploadBack = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${rutaBack}/photos/new`,data);
      //Verificar que se haya guardado bien 
    } catch (error) {
      console.log("Error en actions uploadBack", error);
    }
  };
};

export const updateProfilePicture = ({ auth0Id, newUrl }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      let response = await axios.post(
        `${rutaBack}/photos/update-profile-picture`,
        { auth0Id, newUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.message === "Success") {
        toast.success("The profile picture was updated successfully");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error en actions updateProfilePicture", error);
    }
  };
};
