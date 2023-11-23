import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getAllCustomers = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_CUSTOMER,
    payload: false,
  });

  axios({
    method: "get",
    url: `/utils/getAllMates?limit=${limit}&page=${page}&search=${search}`,
    basic: true,
    headers: {
      Authorization:
        "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
    },
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER,
        payload: [],
      });

      dispatch({
        type: "SHOW_ALERT",
        payload: "Something went Wrong! Try Again",
      });
    });
};

export const getCustomerReport = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_CUSTOMER_REPORT,
    payload: false,
  });

  axios({
    method: "get",
    url: `/customer/getCustomerReport`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_REPORT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_REPORT,
        payload: [],
      });

      dispatch({
        type: "SHOW_ALERT",
        payload: "Something went Wrong! Try Again",
      });
    });
};
