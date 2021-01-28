import { ShopAction, ShopType } from "@/reducers/shop";
import { request } from "@/utils/request";
import { Dispatch } from "redux";

/**获取课程参数类型 */
export interface GetShopLessionListType {
  /**场馆id */
  venueId: string;
  /**某天具体查询(yyyy-MM-dd) */
  date?: string;
  pageNo: number;
  pageSize: number;
}
/**
 * 查看课程列表
 */
export const getShopLessonList = (params: GetShopLessionListType) => async (
  dispatch: Dispatch<ShopAction>
) => {
  const res = await request(
    "/gym/venueCourseForWeb/queryVenueCourseByPage.do",
    params
  );
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? ShopType.RESET_SHOP_LESSION_LIST
          : ShopType.SET_SHOP_LESSION_LIST,
      payload: { lessionList: result.list, canloading: result.hasNextPage },
    });
  }
};

/**
 * 查看私教列表
 */
export const getShopTralarList = (params: { pageNo: number }) => async (
  dispatch: Dispatch<ShopAction>
) => {
  const res = await request("/gym/coashForWeb/queryCoashByPage.do", params);
  const { success, result } = res;
  if (success) {
    dispatch({
      type:
        params.pageNo === 1
          ? ShopType.RESET_SHOP_TRALAR
          : ShopType.SET_SHOP_TRALAR,
      payload: { tarlarList: result.list, canloading: result.hasNextPage },
    });
  }
};
