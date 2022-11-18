import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index.js";
import thunkMiddleware from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;

/* ESTA ES TODA LA CONFIGURACION INICIAL PARA LA STORE DE REDUX, EL thunkMiddleware ES QUIEN PERMITE EL COMPORTAMIENTO ASINCRONO A REDUX*/
