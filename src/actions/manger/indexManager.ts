import Taro from "@tarojs/taro";
import {
  ManagerIndexDispatchParams,
  MangerIndexActionType,
} from "@/reducers/manger/indexManger";
import { request } from "@/utils/request";
import { Dispatch } from "react";

interface GetListType {
  /**场馆名字 */
  name?: string;
  /**场馆类型 */
  gymType?: string;
  pageNo: number;
  pageSize?: number;
}

/**
 * 查看场馆列表
 */
export const getVenueList = (params: GetListType) => async (
  dispatch: Dispatch<ManagerIndexDispatchParams>
) => {
  const res = await request(
    "/gym/venueForAdmin/queryVenueByPage.admin",
    params
  );
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? MangerIndexActionType.SEARCH_VENUE_LIST
          : MangerIndexActionType.SET_VENUE_LIST,
      payload: { venueList: result.list, canloading: result.hasNextPage },
    });
  }
};

/**
 * 查看课程列表
 */
export const getLessonList = (params: GetListType) => async (
  dispatch: Dispatch<ManagerIndexDispatchParams>
) => {
  const res = await request(
    "/gym/venueCourseForAdmin/queryVenueCourseByPage.admin",
    params
  );
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? MangerIndexActionType.RESET_LESSION_LIST
          : MangerIndexActionType.CHECK_LESSION_LIST,
      payload: { lessionList: result.list, canloading: result.hasNextPage },
    });
    console.log("result.hasNextPage: ", result.hasNextPage);
  }
};

/**
 * 查看私教列表
 */
export const getPersonTralarList = (params: GetListType) => async (
  dispatch: Dispatch<ManagerIndexDispatchParams>
) => {
  const res = await request(
    "/gym/coashForAdmin/queryCoashByPage.admin",
    params
  );
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? MangerIndexActionType.RESET_PERSION_TRALAR_LIST
          : MangerIndexActionType.CHECK_PERSION_TRALAR_LIST,
      payload: {
        personTralarList: result.list,
        canloading: result.hasNextPage,
      },
    });
  }
};

/**
 * 删除场馆
 * @param params
 */
export const deleteCurrentVenue = (params: {
  id: string;
  index: number;
}) => async (dispatch: Dispatch<ManagerIndexDispatchParams>) => {
  const { id, index } = params;
  const res = await request("/gym/venueForAdmin/deleteVenue.admin", { id });
  if (res.success) {
    dispatch({
      type: MangerIndexActionType.DELETE_CURRENT_VENUE,
      payload: { index },
    });
    Taro.showToast({
      title: "删除成功",
      icon: "success",
    });
  }
};

/**
 * 删除课程
 * @param params
 */
export const deleteCurrentLession = (params: {
  id: string;
  index: number;
}) => async (dispatch: Dispatch<ManagerIndexDispatchParams>) => {
  const { id, index } = params;
  const res = await request(
    "/gym/venueCourseForAdmin/deleteVenueCourseById.admin",
    { id }
  );
  if (res.success) {
    dispatch({
      type: MangerIndexActionType.DELETE_CURRENT_LESSION,
      payload: { index },
    });
    Taro.showToast({
      title: "删除成功",
      icon: "success",
    });
  }
};

/**课程或私教的状态 */
export enum LessionOrPersonState {
  enable,
  disable,
}

/**
 * 激活or禁用课程
 * @param params
 */
export const enableOrDisableLession = (params: {
  id: string;
  index: number;
  state: LessionOrPersonState;
}) => async (dispatch: Dispatch<ManagerIndexDispatchParams>) => {
  const { id, index, state } = params;
  const res = await request(
    state === LessionOrPersonState.disable
      ? "/gym/venueCourseForAdmin/disableVenueCourse.admin"
      : "/gym/venueCourseForAdmin/enableVenueCourse.admin",
    { id }
  );
  if (res.success) {
    dispatch({
      type:
        state === LessionOrPersonState.disable
          ? MangerIndexActionType.DISABLE_CURRENT_LESSION
          : MangerIndexActionType.ENBALE_CURRENT_LESSION,
      payload: { index },
    });
    Taro.showToast({
      title: state === LessionOrPersonState.disable ? "禁用成功" : "激活成功",
      icon: "success",
    });
  }
};

/**
 * 删除私教
 * @param params
 */
export const deleteCurrentPersonTralar = (params: {
  id: string;
  index: number;
}) => async (dispatch: Dispatch<ManagerIndexDispatchParams>) => {
  const { id, index } = params;
  const res = await request("/gym/coashForAdmin/deleteCoashById.admin", { id });
  if (res.success) {
    dispatch({
      type: MangerIndexActionType.DELETE_CURRENT_PERSION_TRALAR,
      payload: { index },
    });
    Taro.showToast({
      title: "删除成功",
      icon: "success",
    });
  }
};

/**
 * 激活or禁用私教
 * @param params
 */
export const enableOrDisablePersionTralar = (params: {
  id: string;
  index: number;
  state: LessionOrPersonState;
}) => async (dispatch: Dispatch<ManagerIndexDispatchParams>) => {
  const { id, index, state } = params;
  const res = await request(
    state === LessionOrPersonState.disable
      ? "/gym/coashForAdmin/disableCoash.admin"
      : "/gym/coashForAdmin/enableCoash.admin",
    { id }
  );
  if (res.success) {
    dispatch({
      type:
        state === LessionOrPersonState.disable
          ? MangerIndexActionType.DISABLE_CURRENT_PERSION_TRALAR
          : MangerIndexActionType.ENBALE_CURRENT_PERSION_TRALAR,
      payload: { index },
    });
    Taro.showToast({
      title: state === LessionOrPersonState.disable ? "禁用成功" : "激活成功",
      icon: "success",
    });
  }
};
