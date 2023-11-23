import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUser = () => (dispatch) => {
  if (localStorage.getItem("token")) {
    dispatch({
      type: actionTypes.GET_USER,
      payload: false,
    });

    axios({
      method: "get",
      url: "/adminUser/getUser",
    })
      .then((res) => {
        dispatch({
          type: actionTypes.GET_USER,
          payload: res.data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.SHOW_ALERT,
          payload: "Token Expired! Please Login Again",
        });
        dispatch({
          type: actionTypes.GET_USER,
          payload: false,
        });
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.replace("/login");
        }, 900);
      });
  }
};

export const getDashboardData = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_DASHBOARD,
    payload: false,
  });

  axios({
    method: "get",
    url: "/adminUser/getDashboardData",
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_DASHBOARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_DASHBOARD,
        payload: false,
      });
    });
};

export const showAlert = (msg) => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_ALERT,
    payload: msg,
  });
};
