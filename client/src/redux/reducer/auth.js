import {  } from "../actions/auth";

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
