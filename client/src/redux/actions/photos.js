import axios from "axios";
import rutaBack from "./rutaBack";
import { toast } from "react-toastify";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify

export const uploadBack = (data) => {
  return async (dispatch) => {
    try {
      console.log("Esta es la data que mando al back:", data);
      const { id_user, highUrl, lowUrl } = data;
      const auth0Id = id_user;

      const token = localStorage.getItem("authToken");

      if (!token) throw new Error("No authorization token found");

      console.log("Token", token);

      const response = await axios.post(`${rutaBack}/photos/new`, 
        { auth0Id, highUrl, lowUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.message === "success")
        toast.success("The photo was posted successfully");
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
