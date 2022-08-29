import * as constnats from "./constants";

const INITIAL_STATE = {
  value: false,
};

export const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constnats.START:
      return {
        ...state,
        value: true,
      };
    case constnats.STOP:
      return {
        ...state,
        value: false,
      };
    default:
      return state;
  }
};
