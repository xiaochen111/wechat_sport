// import { LoginType } from "@/reducers/login";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { Dispatch } from "redux";
import { setNav, TabbarAction } from "@/reducers/tabbar";
import { UserInfo } from "@/pages/authorize/login";

/**
 * 身份
 */
enum identities {
  /**
   * 管理者
   */
  isManger = 1,
  /**
   * 微信用户
   */
  isWechat = 0,
}

export interface PersonInfo {
  /**头像 */
  headPic: string;
  /**管理员标示 1-管理员 0-微信用户 */
  isAdmin: number;
  /**昵称 */
  nick: string;
  /**token */
  token: string;
  /**tokenKey */
  tokenKey: string;
}

/**
 * 通过接口获取openid 和 sessionkey
 * @param code
 */
export const asyncGetOpenIdAndSessionKey = (params: {
  code: string;
  encryptedData: string;
  iv: string;
}) => async (dispatch: Dispatch) => {
  const res = await request("/user/login/appletAutoLogin.do", params);
  const { success, result } = res;
  if (success) {
    const { isAdmin } = result;
    dispatch({
      type: setNav.SET_TABBAR_STYLE,
      payload: { isManger: isAdmin === identities.isManger },
    } as TabbarAction);
    Taro.setStorageSync("userInfo", result);
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }
};

/**
 * 管理员登录
 * @param params
 */
export const doLogin = (params: UserInfo) => async (dispatch: Dispatch) => {
  const res = await request("/user/login/adminLogin.do", params);
  const { success, result } = res;
  if (success) {
    const { isAdmin } = result;
    dispatch({
      type: setNav.SET_TABBAR_STYLE,
      payload: { isManger: isAdmin === identities.isManger },
    } as TabbarAction);
    Taro.setStorageSync("userInfo", result);
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }
};
