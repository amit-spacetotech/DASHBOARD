
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getAllPushNotifcation = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PUSH_NOTIFICATION,
    payload: false,
  });

  axios({
    method: "get",
    url: `/pushNotification/getPushNotifications?limit=${limit}&page=${page}&search=${search}`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_PUSH_NOTIFICATION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_PUSH_NOTIFICATION,
        payload: [],
      });

      dispatch({
        type: "SHOW_ALERT",
        payload: "Something went Wrong! Try Again",
      });
    });
};
