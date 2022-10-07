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

export const addProduct = (id) => {
    return {
        type: constants.ADD_FAVORITE_PRODUCT,
        value: id,
    };
};

export const searchAction = (value) => {
    return {
        type: constants.SEARCH_ACTION,
        value: value,
    };
};

export const searchResultNumber = (value) => {
    return {
        type: constants.SEARCH_RESULT_NUMBER,
        value: value,
    };
};

export const searchLoading = (value) => {
    return {
        type: constants.SEARCH_LOADING,
        loadingState: value,
    };
};
export const showMap = (value) => {
    return {
        type: constants.SHOW_MAP,
        value: value,
    };
};
