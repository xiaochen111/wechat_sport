import { combineReducers } from "redux";
import { loadingReducer } from "redux-thunk-loading";
import counter from "./counter";
import tabber from "./tabbar";
import home from "./home";
import login from "./login";
import venue from "./manger/venue";
import lession from "./manger/lession";
import global from "./global";
import managerIndex from "./manger/indexManger";
import personTralar from "./manger/personTralar";

type DeepNoPartial<T> = {
  [U in keyof T]: T[U] extends object ? DeepNoPartial<T[U]> : T[U];
};

const combine = combineReducers({
  loadingReducer,
  counter,
  tabber,
  home,
  login,
  venue,
  lession,
  global,
  managerIndex,
  personTralar,
});

export type CombineType = ReturnType<typeof combine>;
// export type CombineType = DeepNoPartial<ReturnType<typeof combine>>;

export default combine;
