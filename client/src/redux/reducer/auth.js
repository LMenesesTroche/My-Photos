import {
  LOGIN_SUCCESS,
} from "../actions/auth";
  
  const initialState = {
    user: {},
    isAuth: false,
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {

      case LOGIN_SUCCESS:
        return { ...state, isAuth: true, user: payload };
 
      default:
        return state;
    }
  };
  
  export default authReducer;
  