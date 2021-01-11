export enum setNav {
  SET_CURRENT = "SET_CURRENT",
}

const INITIAL_STATE = {
  selected: 0,
};

export default function tabber(
  state = INITIAL_STATE,
  action: { type: setNav; payload: any }
) {
  const { payload, type } = action;

  switch (type) {
    case setNav.SET_CURRENT:
      return {
        ...state,
        selected: payload.selected,
      };

    default:
      return state;
  }
}
