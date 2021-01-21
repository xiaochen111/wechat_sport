// import { LoginType } from "@/reducers/login";
import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { Dispatch } from "redux";

/**
 * 通过接口获取openid 和 sessionkey
 * @param code
 */
export const asyncGetOpenIdAndSessionKey = (params: {
  code: string;
  encryptedData: string;
  iv: string;
}) =>
  function* (dispatch: Dispatch) {
    const res = yield request("/user/login/appletAutoLogin.do", params);
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
    // dispatch({ type: LoginType.GET_OPENID_SESSION_KEY });
  };
