import * as constants from "../constants";

export const setGettedShoopingCart = (arr) => (dispatch) =>
  dispatch({ type: constants.GET_SHOOPING_CART, payload: arr });

export const addItemToShoopingCart = (item) => (dispatch) => {
  if (item.length === 0) {
    dispatch({ type: constants.RESET_SHOOPING_CART });
  } else {
    dispatch({ type: constants.ADD_ITEM, payload: item });
  }
};

export const changeItemNumber = (id, newNum) => (dispatch) => {
  dispatch({
    type: constants.EDIT_NUMBER,
    payload: { id: id, newNum: newNum },
  });
};

export const removeItemFromShoopingCart = (id) => (dispatch) => {
  dispatch({ type: constants.ADD_ITEM, payload: id });
};

export const resetShoopingCart = () => (dispatch) =>
  dispatch({ type: constants.RESET_SHOOPING_CART });

export const loadingShoopingCart = (value) => (dispatch) => {
  if (value === true) {
    dispatch({ type: constants.LOADING });
  } else {
    dispatch({ type: constants.STOP_LOADING });
  }
};
