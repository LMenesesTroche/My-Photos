import {
  STORE_TOKEN,
  SET_AUTHORIZATION,
  REMOVE_TOKEN,
} from "../actions/auth";

const initialState = {
  token: null,
  isAuthorized: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return { ...state, token: action.payload };
      
    case REMOVE_TOKEN:
      return { ...state, token: null };

    case SET_AUTHORIZATION:
      return { ...state, isAuthorized: action.payload };

    default:
      return state;
  }
};

export default authReducer;
