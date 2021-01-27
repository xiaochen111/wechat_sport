import Taro from "@tarojs/taro";
import { fileUploadRequest, request } from "@/utils/request";
import { Dispatch } from "redux";
import {
  PersonTarlarType,
  PersonTralarAction,
} from "@/reducers/manger/personTralar";

/**
 * 文件上传
 * @param params
 */
export const personTralarFileUplad = (
  params: { file: string },
  type: "main" | "list"
) => async (dispatch: Dispatch) => {
  const res = await fileUploadRequest("/gym/base/uploadFile.do", params);
  const {
    success,
    result: { fileAllPath, id },
  } = res;

  if (success) {
    if (type === "list") {
      dispatch({
        type: PersonTarlarType.SET_PERSON_TRALAR_PIC,
        payload: { personTralarData: { files: [{ url: fileAllPath, id }] } },
      } as PersonTralarAction);
    }
    if (type === "main") {
      dispatch({
        type: PersonTarlarType.SET_PERSON_TRALAR_MAIN_PIC,
        payload: { personTralarData: { mainPic: [{ url: fileAllPath, id }] } },
      } as PersonTralarAction);
    }
  }
};

/**
 * 添加私教
 */
export const addPersonTralar = (params: any) => async () => {
  const res = await request("/gym/coashForAdmin/addCoash.admin", params);
  const { success } = res;
  if (success) {
    Taro.showToast({
      title: "添加成功",
      icon: "success",
    });
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }
};

/**
 * 修改私教
 */
export const eidtPersonTralar = (params: any) => async () => {
  const res = await request("/gym/coashForAdmin/updateCoash.admin", params);
  const { success } = res;
  if (success) {
    Taro.showToast({
      title: "修改成功",
      icon: "success",
    });
    Taro.switchTab({
      url: "/pages/home/index",
    });
  }
};
