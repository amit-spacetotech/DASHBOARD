import * as actionTypes from "../actions/pushNotification/actionTypes";

const initialState = {
  pushNotifications: false,
  count: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PUSH_NOTIFICATION:
      return {
        ...state,
        pushNotifications: action.payload.notifications,
        count: action.payload.totalPage,
      };

    default:
      return state;
  }
};

export default reducer;
