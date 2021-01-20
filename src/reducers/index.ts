import { combineReducers } from "redux";
import { loadingReducer } from "redux-thunk-loading";
import counter from "./counter";
import tabber from "./tabbar";
import home from "./home";
import login from "./login";

export default combineReducers({
  loadingReducer,
  counter,
  tabber,
  home,
  login,
});
