import axios from "axios";
import rutaBack from "./rutaBack";
export const STORE_TOKEN = "STORE_TOKEN";
export const SET_AUTHORIZATION = "SET_AUTHORIZATION";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

// Action to store token for authenticated users
export const storeAuthToken = (user) => async (dispatch) => {
  try {
    const response = await axios.post(`${rutaBack}/users/api`, user); // API call to get the token
    const token = response.data.token;
    
    // Dispatch token to the store if needed
    dispatch({ type: STORE_TOKEN, payload: token });
    
    // Save token to localStorage
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

// Action to remove token from localStorage when unauthenticated
export const removeAuthToken = () => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({ type: REMOVE_TOKEN });
};

// Action to check if the user is authorized (admin)
export const checkAuthorization = (user) => (dispatch) => {
  const isAuthorized = 
    user.email === import.meta.env.VITE_APP_ADMIN_EMAIL && 
    user.sub === import.meta.env.VITE_APP_ADMIN_AUTH0_ID;

  dispatch({ type: SET_AUTHORIZATION, payload: isAuthorized });
};
