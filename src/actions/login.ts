// import { LoginType } from "@/reducers/login";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { Dispatch } from "redux";
import { UserInfo } from "@/pages/authorize/login";
import { setNav, TabbarAction } from "@/reducers/tabbar";

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

/**
 * 通过接口获取openid 和 sessionkey
 * @param code
 */
export const asyncGetOpenIdAndSessionKey = (params: {
  code: string;
  encryptedData: string;
  iv: string;
}) => async () => {
  const res = await request("/user/login/appletAutoLogin.do", params);
  const {
    success,
    result: { tokenKey, token },
  } = res;
  if (success) {
    Taro.setStorageSync("userInfo", {
      tokenKey,
      token,
    });
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
    const { isAdmin, tokenKey, token } = result;
    dispatch({
      type: setNav.SET_TABBAR_STYLE,
      payload: { isManger: isAdmin === identities.isManger },
    } as TabbarAction);
    Taro.setStorageSync("userInfo", {
      tokenKey,
      token,
    });
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }
};
