import { GET_USERS, USER_PUBLIC_INFO, DELETE_PHOTO } from "../actions/users";

const initialState = {
  allUsers: [],
  userPublicInfo: null,
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
    default:
      return state;
  }
};

export default usersReducer;
