import { Dispatch } from "redux";
import { ADD, MINUS } from "../constants/counter";

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};

// 异步的action
// export function asyncAdd() {
//   return async (dispatch) => {
//     // setTimeout(() => {
//     //   dispatch(add());
//     // }, 2000);
//     console.log("--2");
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     dispatch(add());
//   };
// }

export const asyncAdd = () =>
  function* (dispatch: Dispatch) {
    const res = yield new Promise((resolve) =>
      setTimeout(() => resolve(true), 3000)
    );
    console.log("res: ", res);
    dispatch(add());
  };
