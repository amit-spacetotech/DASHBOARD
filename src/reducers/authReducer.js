import * as actionTypes from "../actions/auth/actionTypes";

const initialState = {
  user: false,
  alert: false,
  dashBoard: false,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case actionTypes.GET_DASHBOARD:
      return {
        ...state,
        dashBoard: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
