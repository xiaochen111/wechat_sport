/**
 *  action type 类型
 */
export enum MangerIndexActionType {
  /**
   * 添加场馆列表
   */
  SET_VENUE_LIST = "SET_VENUE_LIST",
}

/** dispatch 参数类型 */
export interface ManagerIndexDispatchParams {
  type: MangerIndexActionType;
  payload?: Partial<ManagerIndexStateType>;
}

/**
 * managerindex的redux数据
 */
export interface ManagerIndexStateType {
  /**场馆列表 */
  venueList: any[];
}

const INITIAL_STATE: ManagerIndexStateType = {
  venueList: [],
};

export default function managerIndex(
  state = INITIAL_STATE,
  action: ManagerIndexDispatchParams
) {
  const { payload, type } = action;

  switch (type) {
    case MangerIndexActionType.SET_VENUE_LIST:
      return {
        ...state,
        venueList: [...state.venueList, ...payload?.venueList!],
      };
    default:
      return state;
  }
}
