import { LOGIN_SUCCESS, LOGOUT, GET_USER_INFO_SUCCESS } from "../actions/auth";

const initialState = {
  user: {},
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    
    default:
      return state;
  }
};

export default authReducer;
