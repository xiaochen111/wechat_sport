import Taro from "@tarojs/taro";
import { PersonInfo } from "@/actions/login";

const user: PersonInfo = Taro.getStorageSync("userInfo");
export interface GlobalStateType {
  /**业务字典数据 */
  dictData: any;
  userInfo: PersonInfo;
}

/**获取业务字典的key */
export enum dictKeyName {
  /**场馆类型 */
  GYM_TYPE = "GYM_TYPE",
}

export enum GlobalType {
  /**设置业务字典数据 */
  SET_GLOBAL_DATA = "SET_GLOBAL_DATA",
  /**设置个人信息 */
  SET_USER_INFO = "SET_USER_INFO",
}

type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};

export interface GlobalAction {
  type: GlobalType;
  payload?: DeepPartial<GlobalStateType>;
}

const initialState: GlobalStateType = {
  dictData: {},
  userInfo: {
    headPic: user.headPic,
    nick: user.nick,
    token: user.token,
    tokenKey: user.tokenKey,
    isAdmin: user.isAdmin,
  },
};

export default function global(
  state: GlobalStateType = initialState,
  action: GlobalAction
) {
  const { payload, type } = action;
  switch (type) {
    case GlobalType.SET_GLOBAL_DATA:
      return {
        ...state,
        dictData: payload!.dictData,
      };
    case GlobalType.SET_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...payload?.userInfo!,
        },
      };
    default:
      return state;
  }
}
