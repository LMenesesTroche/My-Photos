import { LOGIN_SUCCESS, LOGOUT, GET_USER_INFO_SUCCESS } from "../actions/auth";

const initialState = {
  user: {},
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, user: payload };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case GET_USER_INFO_SUCCESS:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default authReducer;
