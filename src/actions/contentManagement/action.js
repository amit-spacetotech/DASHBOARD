import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getAllFaq = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_FAQ,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getFaq?limit=${limit}&page=${page}&search=${search}`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_FAQ,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_FAQ,
        payload: [],
      });
    });
};

export const getTestimonial = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TESTIMONIAL,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getTestimonial?limit=${limit}&page=${page}&search=${search}`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_TESTIMONIAL,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_TESTIMONIAL,
        payload: [],
      });
    });
};
export const getContactUs = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_CONTACT_US,
    payload: false,
  });

  axios({
    method: "get",
    url: `/contact/getContacUs?limit=${limit}&page=${page}&search=${search}`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_CONTACT_US,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CONTACT_US,
        payload: [],
      });
    });
};
export const getBlogs = (limit, page, search) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_BLOGS,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getBlogs?limit=${limit}&page=${page}&search=${search}`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_BLOGS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BLOGS,
        payload: [],
      });
    });
};
export const getPrivacy = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRIVACY,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getConfidential?type=PRIVACY`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_PRIVACY,
        payload: res.data.term.text,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_PRIVACY,
        payload: "NO_DATA",
      });
    });
};
export const getStory = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_STORY,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getConfidential?type=STORY`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_STORY,
        payload: res.data.term,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_STORY,
        payload: "NO_DATA",
      });
    });
};

export const getPricing = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRIVACY,
    payload: false,
  });

  axios({
    method: "get",
    url: `/content/getConfidential?type=PRICING`,
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_PRICING,
        payload: res.data.term.text,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_PRICING,
        payload: "NO_DATA",
      });
    });
};
export const getTerms = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TERMS,
    payload: false,
  });

  axios({
    method: "get",
    url: "/content/getTerms",
  })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_TERMS,
        payload: res.data.term,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_TERMS,
        payload: "NO_DATA",
      });
    });
};

export const setPrivacy = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_PRIVACY,
    payload: data,
  });
};
export const setTerms = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TERMS,
    payload: data,
  });
};
