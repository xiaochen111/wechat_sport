import Taro from "@tarojs/taro";
import { VenueAction, VenueType } from "@/reducers/manger/venue";
import { fileUploadRequest, request } from "@/utils/request";
import { Dispatch } from "redux";

/**
 * 文件上传
 * @param params
 */
export const fileUplad = (
  params: { file: string },
  type: "main" | "list"
) => async (dispatch: Dispatch) => {
  const res = await fileUploadRequest("/gym/base/uploadFile.do", params);
  console.log("res: ", res);
  const {
    success,
    result: { fileAllPath, id },
  } = res;

  if (success) {
    if (type === "list") {
      dispatch({
        type: VenueType.SET_VENUN_PIC,
        payload: { venueData: { files: [{ url: fileAllPath, id }] } },
      } as VenueAction);
    }
    if (type === "main") {
      dispatch({
        type: VenueType.SET_VENUN_MAIN_PIC,
        payload: { venueData: { mainPic: [{ url: fileAllPath, id }] } },
      } as VenueAction);
    }
  }
};

/**
 * 添加场馆
 */
export const addVenue = (params: any) => async () => {
  const res = await request("/gym/venueForAdmin/addVenue.admin", params);
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
 * 修改场馆
 */
export const editVenue = (params: any) => async () => {
  const res = await request("/gym/venueForAdmin/updateVenue.admin", params);
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
