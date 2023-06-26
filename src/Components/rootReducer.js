// rootReducer.js
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  // Add other reducers here if needed
});

export default rootReducer;
