import { combineReducers } from "redux";
import { loadingReducer } from "redux-thunk-loading";
import counter from "./counter";
import tabber from "./tabbar";
import home from "./home";
import login from "./login";

const combine = combineReducers({
  loadingReducer,
  counter,
  tabber,
  home,
  login,
});

export type CombineType = ReturnType<typeof combine>;

export default combine;
