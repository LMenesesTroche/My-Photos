import {
  GET_USERS,
  USER_PUBLIC_INFO,
  DELETE_PHOTO,
  USER_HAS_PAID,
  USER_BLOCKED,
  USER_UNBLOCKED
} from "../actions/users";
import { USER_WAS_FORGIVEN } from "../actions/payments";

const initialState = {
  allUsers: [],
  userPublicInfo: null,
  hasPaid: false,
};

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return { ...state, allUsers: payload };
    case USER_PUBLIC_INFO:
      return { ...state, userPublicInfo: payload };
    case DELETE_PHOTO:
      return {
        ...state,
        userPublicInfo: {
          ...state.userPublicInfo,
          photos: state.userPublicInfo.photos.filter(
            (photo) => photo.id_photos !== action.payload
          ),
        },
      };
    case USER_HAS_PAID:
      return { ...state, hasPaid: payload };
    case USER_WAS_FORGIVEN:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.auth0Id === payload ? { ...user, hasPaid: true } : user
        ),
      };
    case USER_BLOCKED:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.auth0Id === payload ? { ...user, hasBeenBlocked: true } : user
        ),
      };
    case USER_UNBLOCKED:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.auth0Id === payload ? { ...user, hasBeenBlocked: false } : user
        ),
      };
      
    default:
      return state;
  }
};

export default usersReducer;
