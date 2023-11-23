import * as actionTypes from "../actions/property/actionTypes";

const initialState = {
  property: false,
  propertyCount: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PROPERTY:
      return {
        ...state,
        property: action.payload.homeDetails,
        propertyCount: action.payload.totalPage,
      };

    default:
      return state;
  }
};

export default reducer;
