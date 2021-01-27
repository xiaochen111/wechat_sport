import Taro from "@tarojs/taro";
import { fileUploadRequest, request } from "@/utils/request";
import { Dispatch } from "redux";
import { LessionAction, LessionActionType } from "@/reducers/manger/lession";

/**
 * 文件上传
 * @param params
 */
export const lessionFileUplad = (
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
        type: LessionActionType.SET_FILES_PIC,
        payload: { lessionData: { files: [{ url: fileAllPath, id }] } },
      } as LessionAction);
    }
    if (type === "main") {
      dispatch({
        type: LessionActionType.SET_MAIN_PIC,
        payload: { lessionData: { mainPic: [{ url: fileAllPath, id }] } },
      } as LessionAction);
    }
  }
};

/**
 * 添加课程
 */
export const addLession = (params: any) => async () => {
  const res = await request(
    "/gym/venueCourseForAdmin/addVenueCourse.admin",
    params
  );
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
 * 修改课程
 */
export const editLession = (params: any) => async () => {
  const res = await request(
    "/gym/venueCourseForAdmin/updateVenueCourse.admin",
    params
  );
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
