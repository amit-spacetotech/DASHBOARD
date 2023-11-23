import * as actionTypes from "../actions/moveIn/actionTypes";

const initialState = {
  moveIn: false,
  moveInCount: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_MOVE_INS:
      return {
        ...state,
        moveIn: action.payload.getMoveIns,
        moveInCount: action.payload.totalPage,
      };

    default:
      return state;
  }
};

export default reducer;
