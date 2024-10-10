import rutaBack from "./rutaBack";
import axios from "axios";
export const USER_HAS_PAID = "USER_HAS_PAID";

export const forgivePaymentByUserId = (auth0Id) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(`${rutaBack}/payments/forgive-user`,{auth0Id:auth0Id});
        console.log(response.data)
        if(response.data.message === "Forgiven succesfully"){
            window.alert("Lets goo")
            console.log("Se logroooo!!!")
            return dispatch({
              type: USER_HAS_PAID,
              payload: true,
            });
        }

      } catch (error) {
        console.log("Error en actions get all Users", error);
      }
    };
  };