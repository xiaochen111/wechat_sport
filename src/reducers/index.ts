import { combineReducers } from "redux";
import { loadingReducer } from "redux-thunk-loading";
import counter from "./counter";
import tabber from "./tabbar";
import home from "./home";
import login from "./login";
import venue from "./manger/venue";
import lession from "./manger/lession";
import global from "./global";

const combine = combineReducers({
  loadingReducer,
  counter,
  tabber,
  home,
  login,
  venue,
  lession,
  global,
});

export type CombineType = ReturnType<typeof combine>;

export default combine;
