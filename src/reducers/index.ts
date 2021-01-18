import { combineReducers } from "redux";
import counter from "./counter";
import tabber from "./tabbar";
import home from "./home";

export default combineReducers({
  counter,
  tabber,
  home,
});
