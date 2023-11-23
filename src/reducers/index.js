import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import contentReducer from "./contentReducer";
import pushNotificationReducer from "./pushNotificationReducer";
import propertyReducer from "./propertyReducer";
import authReducer from "./authReducer";
import moveInReducer from "./moveInReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
  customer: customerReducer,
  content: contentReducer,
  pushNotification: pushNotificationReducer,
  property: propertyReducer,
  auth: authReducer,
  moveIn: moveInReducer,
  payment: paymentReducer,
});
