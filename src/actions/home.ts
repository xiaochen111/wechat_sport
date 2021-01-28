import { HomeAction, homeType } from "@/reducers/home";
import { request } from "@/utils/request";
import { Dispatch } from "redux";

export interface ParamsVenueList {
  /**场馆名字 */
  name?: string;
  /**场馆类型 */
  gymType?: string;
  /**省（默认上海） */
  province?: number;
  /**市（默认上海） */
  city?: number;
  /**区（暂时不需要加区） */
  district?: number;
  /**当前页码 */
  pageNo: number;
  /**每页显示多少条 */
  pageSize?: number;
}

/**
 * wechat查看场馆列表
 */
export const getHomeVenueList = (params: ParamsVenueList) => async (
  dispatch: Dispatch
) => {
  const res = await request("/gym/venueForWeb/queryVenueByPage.do", params);
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? homeType.RESET_WECHAT_VENUN_LIST
          : homeType.CHECK_WECHAT_VENUN_LIST,
      payload: { venueList: result.list, canloading: result.hasNextPage },
    } as HomeAction);
  }
};
