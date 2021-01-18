import { ADD, MINUS } from "../constants/counter";

export interface Counter {
  num: number;
}

const INITIAL_STATE: Counter = {
  num: 0,
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
}
