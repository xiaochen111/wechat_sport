import { LessionStateType } from "./manger/lession";

export interface ShopStateType {
  /**课程list */
  lessionList: any[];
  /**私教list */
  tarlarList: any[];
  canloading: boolean;
  /**当前课程 */
  currentLession: LessionStateType;
}

export enum ShopType {
  /**设置课程 */
  SET_SHOP_LESSION_LIST = "SET_SHOP_LESSION_LIST",
  /**重置课程 */
  RESET_SHOP_LESSION_LIST = "RESET_SHOP_LESSION_LIST",
  /**查看私教 */
  SET_SHOP_TRALAR = "SET_SHOP_TRALAR",
  /**重置私教 */
  RESET_SHOP_TRALAR = "RESET_SHOP_TRALAR",
  /**设置当前课程 */
  SET_DETAIL_LESSION = "SET_DETAIL_LESSION",
}

export interface ShopAction {
  type: ShopType;
  payload?: Partial<ShopStateType>;
}

const initialState: ShopStateType = {
  lessionList: [],
  tarlarList: [],
  canloading: true,
  currentLession: {} as LessionStateType,
};

export default function shop(state = initialState, action: ShopAction) {
  const { payload, type } = action;
  switch (type) {
    case ShopType.SET_SHOP_LESSION_LIST:
      return {
        ...state,
        lessionList: [...state.lessionList, ...payload!.lessionList!],
        canloading: payload?.canloading!,
      };
    case ShopType.RESET_SHOP_LESSION_LIST:
      return {
        ...state,
        lessionList: payload!.lessionList!,
        canloading: payload?.canloading!,
      };
    case ShopType.SET_SHOP_TRALAR:
      return {
        ...state,
        tarlarList: [...state.tarlarList, ...payload!.tarlarList!],
        canloading: payload?.canloading!,
      };
    case ShopType.RESET_SHOP_TRALAR:
      return {
        ...state,
        tarlarList: payload!.tarlarList!,
        canloading: payload?.canloading!,
      };
    case ShopType.SET_DETAIL_LESSION:
      return {
        ...state,
        currentLession: payload?.currentLession!,
      };
    default:
      return state;
  }
}
