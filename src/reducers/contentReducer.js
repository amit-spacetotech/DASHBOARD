import * as actionTypes from "../actions/contentManagement/actionTypes";

const initialState = {
  contact: false,
  privacy: false,
  story: false,
  term: false,
  blogs: false,
  blogsPages: false,
  faq: false,
  pricing: false,
  testimonial: false,
  testimonialCount: 0,
  faqCount: 0,
  contacts: false,
  contactsPages: 0,
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_CONTACT:
      return { ...state, contact: action.payload };
    case actionTypes.GET_CONTACT_US:
      return {
        ...state,
        contacts: action.payload.contactUs,
        contactsPages: action.payload.totalPage,
      };

    case actionTypes.GET_BLOGS:
      return { ...state, blogs: action.payload.blogs };
    case actionTypes.GET_BLOGS_PAGES:
      return { ...state, blogs: action.payload.totalPage };
    case actionTypes.GET_PRICING:
      return { ...state, pricing: action.payload };
    case actionTypes.GET_STORY:
      return {
        ...state,
        story: {
          img: action.payload.img,
          text:action.payload.text
        },
      };
    case actionTypes.GET_PRIVACY:
      return { ...state, privacy: action.payload };
    case actionTypes.GET_TESTIMONIAL:
      return {
        ...state,
        testimonial: action.payload.testimonial,
        testimonialCount: action.payload.totalPage,
      };
    case actionTypes.GET_TERMS:
      return { ...state, term: action.payload };
    case actionTypes.SET_PRIVACY:
      return { ...state, privacy: action.payload };
    case actionTypes.SET_TERMS:
      return { ...state, term: action.payload };
    case actionTypes.GET_FAQ:
      return {
        ...state,
        faq: action.payload.faq,
        faqCount: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default reducer;
