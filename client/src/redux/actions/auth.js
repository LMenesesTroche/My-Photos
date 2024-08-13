import rutaBack from "./rutaBack";
import axios from "axios";

export const register = (formData) => async (dispatch) => {
  const endpoint = `${rutaBack}/users/create`;
  try {
    const response = await axios.post(endpoint, formData);
    if(response.data.id){
      window.alert("Register succesfully")  
    }else{
      window.alert(response.data.message)
    }
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};
