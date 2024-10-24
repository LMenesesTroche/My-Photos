import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from '../redux/reducer/auth';
import usersReducer from "./reducer/users";
import photosReducer from "./reducer/photosReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    users:usersReducer,
    photos:photosReducer
  });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//pasar reducer config file como argumento
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;