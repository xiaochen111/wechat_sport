import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { Dispatch } from "redux";
import { MeAction, MeType } from "@/reducers/me";

/**
 * 获取用户信息
 * @param params
 */
export const getUserInfo = () => async (dispatch: Dispatch<MeAction>) => {
  const res = await request("/user/info/getLoginUserInfo.do");
  const { success, result } = res;
  if (success) {
    dispatch({
      type: MeType.SET_MYINFO,
      payload: { myInfo: result },
    });
  }
};
