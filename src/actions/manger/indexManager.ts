import {
  ManagerIndexDispatchParams,
  MangerIndexActionType,
} from "@/reducers/manger/indexManger";
import { request } from "@/utils/request";
import { Dispatch } from "react";

interface GetVenueListType {
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
export const getVenueList = (params: GetVenueListType) => async (
  dispatch: Dispatch<ManagerIndexDispatchParams>
) => {
  const res = await request(
    "/gym/venueForAdmin/queryVenueByPage.admin",
    params
  );
  const { success, result } = res;
  if (success) {
    dispatch({
      type: MangerIndexActionType.SET_VENUE_LIST,
      payload: { venueList: result.list },
    });
  }
};
