import { request } from "@/utils/request";
import { dictKeyName, GlobalAction, GlobalType } from "@/reducers/global";

export const getDictData = () => async (dispatch) => {
  const res = await request("/gym/base/queryDicts.do", {
    typeList: Object.keys(dictKeyName),
  });
  const { success, result } = res;
  if (success) {
    dispatch({
      type: GlobalType.SET_GLOBAL_DATA,
      payload: { dictData: result },
    } as GlobalAction);
  }
};
