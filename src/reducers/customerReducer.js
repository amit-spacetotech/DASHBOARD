import * as actionTypes from "../actions/customer/actionTypes";

const initialState = {
  customer: false,
  customerCount: 0,
  graphData: false,
  previousMonthPercentage: 0,
  totalUser: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload.houseMates,
        customerCount: action.payload.totalPage,
      };
    case actionTypes.GET_CUSTOMER_REPORT:
      return {
        ...state,
        graphData: action.payload.graphData,
        previousMonthPercentage: action.payload.previousMonthPercentage,
        totalUser: action.payload.totalUser,
      };

    default:
      return state;
  }
};

export default reducer;
