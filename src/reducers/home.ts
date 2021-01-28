export interface HomeStateType {
  /**场馆列表 */
  venueList: any[];
  /**当前选中的区域 */
  currentArea: any;
  /**是否能够继续加载 */
  canloading: boolean;
  /**主题 */
  theme: any;
  /**某一个场馆详情 */
  venueDetail: any;
}

export enum homeType {
  /**查看场馆列表 */
  CHECK_WECHAT_VENUN_LIST = "CHECK_WECHAT_VENUN_LIST",
  /**重置场馆列表 */
  RESET_WECHAT_VENUN_LIST = "RESET_WECHAT_VENUN_LIST",
  /**设置当前选中区域值 */
  SET_CURRENT_AREA = "SET_CURRENT_AREA",
  /**设置当前选中主题值*/
  SET_CURRENT_THEME = "SET_CURRENT_THEME",
  /**设置当前选中的场馆*/
  SET_CURRENT_VENUE_VALUE = "SET_CURRENT_VENUE_VALUE",
}

export interface HomeAction {
  type: homeType;
  payload?: Partial<HomeStateType>;
}

const initialState: HomeStateType = {
  venueList: [],
  currentArea: "",
  canloading: true,
  theme: "",
  venueDetail: {},
};

export default function home(
  state: HomeStateType = initialState,
  action: HomeAction
) {
  const { payload, type } = action;
  switch (type) {
    case homeType.CHECK_WECHAT_VENUN_LIST:
      return {
        ...state,
        venueList: [...state.venueList, ...payload!.venueList!],
        canloading: payload?.canloading!,
      };
    case homeType.RESET_WECHAT_VENUN_LIST:
      return {
        ...state,
        venueList: payload!.venueList!,
        canloading: payload?.canloading!,
      };
    case homeType.SET_CURRENT_AREA:
      return {
        ...state,
        currentArea: payload!.currentArea!,
      };
    case homeType.SET_CURRENT_THEME:
      return {
        ...state,
        theme: payload!.theme!,
      };
    case homeType.SET_CURRENT_VENUE_VALUE:
      return {
        ...state,
        venueDetail: payload?.venueDetail!,
      };
    default:
      return state;
  }
}
