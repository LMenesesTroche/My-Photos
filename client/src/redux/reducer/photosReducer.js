import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
  } from "../actions/photos";

const initialState = {
    uploadedImage: null,
    uploadError: null,
  };
  
  export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_SUCCESS:
        return {
          ...state,
          uploadedImage: action.payload,
          uploadError: null,
        };
  
      case UPLOAD_IMAGE_FAIL:
        return {
          ...state,
          uploadError: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default photosReducer;
