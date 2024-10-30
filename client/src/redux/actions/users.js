import rutaBack from "./rutaBack";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify

export const GET_USERS = "GET_USERS";
export const USER_PUBLIC_INFO = "USER_PUBLIC_INFO";
export const DELETE_PHOTO = "DELETE_PHOTO";
export const USER_HAS_PAID = "USER_HAS_PAID";
export const USER_BLOCKED = "USER_BLOCKED";
export const USER_UNBLOCKED = "USER_UNBLOCKED";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${rutaBack}/users/getAll`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error en actions get all Users", error);
    }
  };
};

export const getUserInfoById = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${rutaBack}/users/${id}`);
      return dispatch({
        type: USER_PUBLIC_INFO,
        payload: response.data,
      });
    } catch (error) {
      console.log("error en actions get user by id", error);
    }
  };
};

export const deletePhoto =
  (id_user, id_photo) => async (dispatch, getState) => {
    try {
      // Get the stored token from localStorage or another place
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authorization token found");
      }

      const auth0Id = id_user;
      // console.log("TODO ESTO MANDO DESDE EL BACK PARA ELIMINAR id user:",id_user,"idPhoto", id_photo,"token:",token)

      const response = await axios.delete(`${rutaBack}/photos/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          auth0Id,
          id_photo,
        },
      });

      if (response.data.message === "Deleted successfully") {
        // Dispatch the delete action in Redux
        dispatch({
          type: "DELETE_PHOTO",
          payload: id_photo,
        });
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };


export const userHasPaidById = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${rutaBack}/users/hasPaid`, {
        userId: id,
      });
      // console.log("Este es el response del back:",response.data)
      return dispatch({
        type: USER_HAS_PAID,
        payload: response.data,
      });
    } catch (error) {
      console.log("error en actions userHasPaidById", error);
    }
  };
};

export const blockUser = (auth0Id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      // console.log("Este es el token que mando al back:", token)

      let response = await axios.post(
        `${rutaBack}/users/block-user`,
        { userId: auth0Id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Este es el response del back:",response.data)
      Swal.fire("Usuario bloqueado", "", "success");

      if (response.data.message === "The user has been blocked succesfully") {
        // console.log("Positivo")
        return dispatch({
          type: USER_BLOCKED,
          payload: auth0Id,
        });
      }
    } catch (error) {
      console.log("Error en actions: block user", error);
      Swal.fire("Error al bloquear usuario", "", "error");
    }
  };
};

export const unblockUser = (auth0Id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken");
      // console.log("Este es el token que mando al back:", token)

      let response = await axios.post(
        `${rutaBack}/users/unblock-user`,
        { userId: auth0Id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Este es el response del back:",response.data)
      Swal.fire("Usuario desbloqueado", "", "success");

      if (response.data.message === "The user has been unblocked succesfully") {
        return dispatch({
          type: USER_UNBLOCKED,
          payload: auth0Id,
        });
      }
    } catch (error) {
      console.log("Error en actions: unblock user", error);
      Swal.fire("Error al desbloquear usuario", "", "error");
    }
  };
};

export const updateUserName = (userId, newName) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    // console.log("Este es el token que mando al back:", token);
    // console.log("datos","Userid:",userId, "NewName;",newName);

    let response = await axios.post(
      `${rutaBack}/users/update-username`,
      { auth0Id: userId, newUserName: newName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.message === "Username updated successfully") {
      toast.success("The Username was updated successfully");
      dispatch(getUserInfoById(userId));
    } else if (response.data.error === "Username already in use") {
      toast.error("This Username is already in use");
    }
  } catch (error) {
    toast.error("There was an error while updating the username");
    console.error("Error updating user name:", error);
  }
};
