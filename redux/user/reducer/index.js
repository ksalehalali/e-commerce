import * as constants from "../constants";

const INITIAL_STATE = {
  user: null,
  loading: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_USER:
      return {
        ...state,
        // new data
        loading: false,
        user: action.payload.user,
      };
    case constants.REMOVE_CURRENT_USER:
      return {
        user: null,
        loading: false,
      };
    case constants.CHECK_CURRENT_USER:
      return {
        ...state,
        // new data
        loading: false,
      };
    case constants.LOADING_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
