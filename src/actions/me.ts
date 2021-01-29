import Taro from "@tarojs/taro";
import { request } from "@/utils/request";
import { Dispatch } from "redux";
import { MeAction, MeType, MyInfo } from "@/reducers/me";
import { GlobalAction, GlobalType } from "@/reducers/global";
import { PersonInfo } from "./login";

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

/**
 * 修改用户信息
 * @param params
 */
export const updateUserInfo = (params: MyInfo) => async (
  dispatch: Dispatch<GlobalAction>
) => {
  const res = await request("/user/info/updateLoginUserInfo.do", params);
  const { success } = res;
  if (success) {
    dispatch({
      type: GlobalType.SET_USER_INFO,
      payload: {
        userInfo: {
          nick: params.nickname,
          headPic: params.img,
        },
      },
    });

    const user: PersonInfo = Taro.getStorageSync("userInfo");
    Taro.setStorageSync("userInfo", {
      ...user,
      ...{ nick: params.nickname, headPic: params.img },
    });

    Taro.showToast({
      title: "修改成功",
      icon: "success",
    });
  }
};
