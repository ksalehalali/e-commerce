//constantsss
import * as constants from "../constants";
const INITIAL_STATE = {
    modalType: 0,
    visible: false,
    successAction: null,
    mPayloads: null,
    editMode: false,
    favoriteProducts: [],
    searchAction: "",
    searchResultNumber: 0,
    loadingState: false,
    afterCodeConfirm: false,
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
                    ...state.modalType.splice(
                        state.modalType.indexOf(action.payload),
                        1
                    ),
                ],
            };

        case constants.ADD_FAVORITE_PRODUCT:
            return {
                ...state,
                favoriteProducts: [...state.favoriteProducts, action.value],
            };

        case constants.SEARCH_ACTION:
            return {
                ...state,
                searchAction: action.value,
            };

        case constants.SEARCH_RESULT_NUMBER:
            return {
                ...state,
                searchResultNumber: action.value,
                st: action.st,
            };
        case constants.SEARCH_LOADING:
            return {
                ...state,
                loadingState: action.loadingState,
            };
        case constants.SHOW_MAP:
            return {
                ...state,
                visible: action.value,
            };
        case constants.AFTER_CODE_CONFIRM:
            return {
                ...state,
                afterCodeConfirm: action.value,
            };

        default:
            return state;
    }
};
