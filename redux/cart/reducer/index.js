import * as constants from "../constants";
const INITIAL_STATE = {
  cartItems: [],
  loading: false,
  sum: 0,
};

export const cartReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.GET_SHOOPING_CART:
      return {
        ...state,
        cartItems: action.payload,
        sum: action?.payload?.length,
      };
    case constants.ADD_ITEM:
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
        sum: [action.payload, ...state.cartItems].length,
      };
    case constants.EDIT_NUMBER:
      let newList = state.cartItems;
      for (let i = 0; i < newList?.length; i++) {
        if (newList[i].id === action.payload.id) {
          newList[i].number = action.payload.newNum;
          break;
        }
      }
      console.log("newList");
      console.log(newList);
      return {
        ...state,
        cartItems: [...newList],
      };
    case constants.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id === payload),
      };
    case constants.LOADING:
      return {
        ...state,
        loading: true,
      };
    case constants.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case constants.RESET_SHOOPING_CART:
      return {
        ...state,
        cartItems: [],
        sum: 0,
      };
    default:
      return state;
  }
};
