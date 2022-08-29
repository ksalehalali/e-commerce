//constantsss
import * as constants from "../constants";
const INITIAL_STATE = {
  modalType: 0,
  visible: false,
  successAction: null,
  mPayloads: null,
  editMode: false,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.OPEN_MODAL:
      return {
        ...state,
        visible: true,
        modalType: action.payload.modalType,
        successAction: action.payload.successAction,
        mPayloads: action.payload.mPayloads,
      };
    case constants.CLOSE_MODAL:
      return {
        ...state,
        visible: false,
        modalType: 0,
        successAction: null,
        mPayloads: null,
        editMode: false,
      };
    case constants.CLOSE_TARGET_MODAL:
      let newArr = state.modalType.splice(
        state.modalType.indexOf(action.payload),
        1
      );
      return {
        ...state,
        visible: true,
        modalType: [
          ...state.modalType.splice(state.modalType.indexOf(action.payload), 1),
        ],
      };
    default:
      return state;
  }
};
