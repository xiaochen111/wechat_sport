/**
 *  action type 类型
 */
export enum MangerIndexActionType {
  /**添加场馆列表*/
  SET_VENUE_LIST = "SET_VENUE_LIST",
  /**重新初始化场馆列表*/
  SEARCH_VENUE_LIST = "SEARCH_VENUE_LIST",
  /**查看课程列表*/
  CHECK_LESSION_LIST = "CHECK_LESSION_LIST",
  /** 重新初始化课程 */
  RESET_LESSION_LIST = "RESET_LESSION_LIST",
  /**查看私教列表 */
  CHECK_PERSION_TRALAR_LIST = "CHECK_PERSION_TRALAR_LIST",
  /**重置私教列表 */
  RESET_PERSION_TRALAR_LIST = "RESET_PERSION_TRALAR_LIST",

  /**删除场馆 */
  DELETE_CURRENT_VENUE = "DELETE_CURRENT_VENUE",

  /**删除课程 */
  DELETE_CURRENT_LESSION = "DELETE_CURRENT_LESSION",
  /**禁用课程 */
  DISABLE_CURRENT_LESSION = "DISABLE_CURRENT_LESSION",
  /**激活课程 */
  ENBALE_CURRENT_LESSION = "ENBALE_CURRENT_LESSION",

  /**删除私教 */
  DELETE_CURRENT_PERSION_TRALAR = "DELETE_CURRENT_PERSION_TRALAR",
  /**禁用私教 */
  DISABLE_CURRENT_PERSION_TRALAR = "DISABLE_CURRENT_PERSION_TRALAR",
  /**激活私教 */
  ENBALE_CURRENT_PERSION_TRALAR = "ENBALE_CURRENT_PERSION_TRALAR",

  /**当前选中的模块 */
  SET_CURRENT_MODULE = "SET_CURRENT_MODULE",
}
/**
 * 模块类型
 */
export enum ListType {
  /**场馆 */
  venue,
  /**课程 */
  lession,
  /**私教 */
  persionTralar,
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
  /**课程列表 */
  lessionList: any[];
  /**私教列表 */
  personTralarList: any[];
  /**是否能继续加载 */
  canloading: boolean;
  /**删除当前项的索引 */
  index: number;
  /**当前选中的模块 */
  currentModule: ListType;
}

const INITIAL_STATE: ManagerIndexStateType = {
  venueList: [],
  lessionList: [],
  personTralarList: [],
  canloading: true,
  index: 0,
  currentModule: 0,
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
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.SEARCH_VENUE_LIST:
      return {
        ...state,
        venueList: payload?.venueList!,
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.CHECK_LESSION_LIST:
      return {
        ...state,
        lessionList: [...state.lessionList, ...payload?.lessionList!],
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.RESET_LESSION_LIST:
      return {
        ...state,
        lessionList: payload?.lessionList!,
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.CHECK_PERSION_TRALAR_LIST:
      return {
        ...state,
        personTralarList: [
          ...state.personTralarList,
          ...payload?.personTralarList!,
        ],
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.RESET_PERSION_TRALAR_LIST:
      return {
        ...state,
        personTralarList: payload?.personTralarList!,
        canloading: payload?.canloading,
      };
    case MangerIndexActionType.DELETE_CURRENT_VENUE:
      state.venueList.splice(payload?.index!, 1);
      return {
        ...state,
        venueList: state.venueList,
      };
    case MangerIndexActionType.DELETE_CURRENT_LESSION:
      state.lessionList.splice(payload?.index!, 1);
      return {
        ...state,
        lessionList: state.lessionList,
      };
    case MangerIndexActionType.ENBALE_CURRENT_LESSION:
      state.lessionList[payload?.index!].status = 1;
      return {
        ...state,
        lessionList: state.lessionList,
      };
    case MangerIndexActionType.DISABLE_CURRENT_LESSION:
      state.lessionList[payload?.index!].status = 0;
      return {
        ...state,
        lessionList: state.lessionList,
      };
    case MangerIndexActionType.SET_CURRENT_MODULE:
      return {
        ...state,
        currentModule: payload?.currentModule,
      };
    case MangerIndexActionType.DELETE_CURRENT_PERSION_TRALAR:
      state.personTralarList.splice(payload?.index!, 1);
      return {
        ...state,
        personTralarList: state.personTralarList,
      };
    case MangerIndexActionType.ENBALE_CURRENT_PERSION_TRALAR:
      state.personTralarList[payload?.index!].status = 1;
      return {
        ...state,
        personTralarList: state.personTralarList,
      };
    case MangerIndexActionType.DISABLE_CURRENT_PERSION_TRALAR:
      state.personTralarList[payload?.index!].status = 0;
      return {
        ...state,
        personTralarList: state.personTralarList,
      };
    default:
      return state;
  }
}
