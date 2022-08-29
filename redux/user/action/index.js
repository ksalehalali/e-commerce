import * as constants from "../constants";

export const setNewUser = (user) => (dispatch) => {
  dispatch({ type: constants.LOADING_CURRENT_USER });
  dispatch({ type: constants.SET_CURRENT_USER, payload: { user: user } });
};

export const removeUser = () => (dispatch) => {
  dispatch({ type: constants.LOADING_CURRENT_USER });
  dispatch({ type: constants.REMOVE_CURRENT_USER });
};

const checkUser = () => (dispatch) => {};
