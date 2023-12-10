import { combineReducers } from "redux";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import siteReducer from "./siteReducer";

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  site: siteReducer,
});

export default rootReducer;
