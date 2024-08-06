import { applyMiddleware, createStore, compose } from "redux";
import authReducer from './reducer/auth';
import { thunk } from "redux-thunk";

//? Todo aqui copiar y pegar

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//pasar reducer config file como argumento
const store = createStore(authReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;