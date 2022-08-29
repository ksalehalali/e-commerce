import * as constnats from "./constants";

export const startLoading = () => (dispatch) =>
  dispatch({ type: constnats.START });
export const stopLoading = () => (dispatch) =>
  dispatch({ type: constnats.STOP });
