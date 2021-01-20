export interface HomeStateType {
  list: any[];
  currentArea: any;
}

export enum homeType {
  SET_LIST = "SET_LIST",
  SET_CURRENT_AREA = "SET_CURRENT_AREA",
}

interface PayloadType {
  list?: any[];
  currentArea?: any;
}

export interface HomeAction {
  type: homeType;
  payload?: PayloadType;
}

const initialState: HomeStateType = {
  list: new Array(8).fill(""),
  currentArea: "",
};

export default function home(state = initialState, action: HomeAction) {
  const { payload, type } = action;
  switch (type) {
    case homeType.SET_LIST:
      return {
        ...state,
        list: payload!.list,
        currentArea: "",
      };
    case homeType.SET_CURRENT_AREA:
      return {
        ...state,
        currentArea: payload!.currentArea,
      };
    default:
      return state;
  }
}
