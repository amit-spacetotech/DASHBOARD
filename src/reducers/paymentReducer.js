import * as actionTypes from "../actions/payment/actionTypes";

const initialState = {
  transactions: false,
  transactionInCount: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PAYMENTS:
      return {
        ...state,
        transactions: action.payload.transactions,
        transactionInCount: action.payload.totalPage,
      };

    default:
      return state;
  }
};

export default reducer;
