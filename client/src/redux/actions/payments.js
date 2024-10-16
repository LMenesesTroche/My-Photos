import rutaBack from "./rutaBack";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify

export const USER_WAS_FORGIVEN = "USER_WAS_FORGIVEN";

export const forgivePaymentByUserId = (auth0Id) => {
  return async (dispatch) => {
    try {
      const adminToken = localStorage.getItem("authToken");
      let response = await axios.post(`${rutaBack}/payments/forgive-user`, 
        { auth0Id: auth0Id },
        { headers: { Authorization: `Bearer ${adminToken}` }} 
      );

      if (response.data.message === "Forgiven succesfully") {
        toast.success("The User was forgiven successfully");

        return dispatch({
          type: USER_WAS_FORGIVEN,
          payload: auth0Id,
        });
      }
    } catch (error) {
      console.log("Error en actions forgive user", error);
      toast.error("There was an error while forgiving");
    }
  };
};
