import { combineReducers } from "redux";

// import all reducers
import { modalReducer } from "./modal/reducer";
import { userReducer } from "./user/reducer";
import { cartReducers } from "./cart/reducer";
import { loadingReducer } from "./loading/reducers";

// COMBINED REDUCERS
const reducers = {
  modal: modalReducer,
  user: userReducer,
  cart: cartReducers,
  loading: loadingReducer,
};

export default combineReducers(reducers);
