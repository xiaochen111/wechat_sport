import { combineReducers } from "redux";
import counter from "./counter";
import tabber from "./tabbar";

export default combineReducers({
  counter,
  tabber,
});
