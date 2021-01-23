import { VenueAction, VenueType } from "@/reducers/manger/venue";
import { fileUploadRequest } from "@/utils/request";
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
    result: { fileAllPath },
  } = res;

  if (success) {
    dispatch({
      type: VenueType.SET_PIC,
      payload: { venueData: { files: [{ url: fileAllPath }] } },
    } as VenueAction);
  }
};
