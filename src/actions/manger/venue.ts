import { VenueAction, VenueType } from "@/reducers/manger/venue";
import { fileUploadRequest, request } from "@/utils/request";
import { Dispatch } from "redux";

/**
 * 文件上传
 * @param params
 */
export const fileUplad = (params: { file: string }) => async (
  dispatch: Dispatch
) => {
  const res = await fileUploadRequest("/gym/base/uploadFile.do", params);
  console.log("res: ", res);
  const {
    success,
    result: { fileAllPath, id },
  } = res;

  if (success) {
    dispatch({
      type: VenueType.SET_PIC,
      payload: { venueData: { files: [{ url: fileAllPath, id }] } },
    } as VenueAction);
  }
};

/**
 * 添加场馆
 */
export const addVenue = (params: any) => async () => {
  const res = await request("/gym/venueForAdmin/addVenue.admin", params);
  const { success, result } = res;
  if (success) {
    console.log("添加成功");
    Taro.showToast({
      title: "添加成功",
      icon: "success",
    });
  }
};
