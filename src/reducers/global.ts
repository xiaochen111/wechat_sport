export interface GlobalStateType {
  /**业务字典数据 */
  dictData: any;
}

/**获取业务字典的key */
export enum dictKeyName {
  /**场馆类型 */
  GYM_TYPE = "GYM_TYPE",
}

export enum GlobalType {
  SET_GLOBAL_DATA = "SET_GLOBAL_DATA",
}

export interface GlobalAction {
  type: GlobalType;
  payload?: Partial<GlobalStateType>;
}

const initialState: GlobalStateType = {
  dictData: {},
};

export default function login(state = initialState, action: GlobalAction) {
  const { payload, type } = action;
  switch (type) {
    case GlobalType.SET_GLOBAL_DATA:
      return {
        ...state,
        dictData: payload!.dictData,
      };
    default:
      return state;
  }
}
