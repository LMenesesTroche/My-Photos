import axios from "axios";
import rutaBack from "./rutaBack";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAIL = "UPLOAD_IMAGE_FAIL";

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

// Esta action sube fotos a cloudinary
export const uploadImageToCloudinary = (file, userSub, setProgress) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portafolioProyect");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/decbwosgj/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
    );

    const highUrl = response.data.secure_url;
    const lowUrl = highUrl.replace("/upload/", "/upload/q_auto:low/");

    // Dispatch the uploaded URLs to the reducer or backend
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: { highUrl, lowUrl, userSub },
    });

    return { highUrl, lowUrl };  // Return URLs for use in the component if needed
  } catch (error) {
    console.error("Error uploading image:", error);
    dispatch({ type: UPLOAD_IMAGE_FAIL, error });
    throw error;
  }
};