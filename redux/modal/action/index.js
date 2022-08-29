//constants
import * as constants from "../constants";
export const openModal =
  (modalType = 0, successAction, mPayloads, editMode = false) =>
  (dispatch) => {
    dispatch({
      type: constants.OPEN_MODAL,
      payload: {
        modalType: modalType,
        successAction: successAction,
        mPayloads: mPayloads,
      },
    });
  };

export const closeModal =
  (modalType = 0) =>
  (dispatch) => {
    dispatch({ type: constants.CLOSE_MODAL, payload: modalType });
  };

export const closeTargetModal =
  (modalType = []) =>
  (dispatch) =>
    dispatch({
      type: constants.CLOSE_TARGET_MODAL,
      payload: modalType,
    });
