import { GET_USERS } from "../actions/users";

const initialState = {
  allUsers: [],
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return { ...state, allUsers:payload };
    default:
      return state;
  }
};

export default usersReducer;
