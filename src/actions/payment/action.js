import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getAllTransaction =
  (page, limit, search, startDate, endDate, status) => (dispatch) => {
    dispatch({
      type: actionTypes.GET_PAYMENTS,
      payload: false,
    });

    axios({
      method: "get",
      url: `/paymnet/getTransactions?page=${page}&limit=${limit}&search=${search}&startDate=${
        startDate ? startDate : ""
      }&endDate=${endDate ? endDate : ""}&status=${status ? status : ""}`,
    })
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PAYMENTS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_PAYMENTS,
          payload: [],
        });

        dispatch({
          type: "SHOW_ALERT",
          payload: "Something went Wrong! Try Again",
        });
      });
  };
