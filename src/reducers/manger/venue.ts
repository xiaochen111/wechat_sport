export type VenueColoumn =
  | "name"
  | "province"
  | "city"
  | "district"
  | "address"
  | "tel"
  | "startTime"
  | "endTime"
  | "describe"
  | "gymType"
  | "files"
  | "chargingType";

type VenueDateType = Record<VenueColoumn, any>;
/**校验字端 */
type VenueDateRequire = Record<VenueColoumn, { errMsg: string; patter?: any }>;
export const checkColoumns: VenueDateRequire = {
  name: { errMsg: "场馆不能为空" },
  province: { errMsg: "省不能为空" },
  city: { errMsg: "市不能为空" },
  district: { errMsg: "区不能为空" },
  address: { errMsg: "地址不能为空" },
  tel: { errMsg: "电话不能为空" },
  startTime: { errMsg: "开始时间不能为空" },
  endTime: { errMsg: "介绍时间不能为空" },
  describe: { errMsg: "场地介绍不能为空" },
  gymType: { errMsg: "场馆类型不能为空" },
  files: { errMsg: "场馆图片不能为空" },
  chargingType: { errMsg: "计费类型不能为空" },
};

/**场馆数据类型 */
export interface VenueStateType {
  venueData: VenueDateType;
  coloum?: VenueColoumn;
  [key: string]: any;
}

/** 场馆type 类型 */
export enum VenueType {
  /**上传成功后添加图片 */
  SET_PIC = "SET_PIC",
  /**点击删除图片 */
  DELETE_PIC = "DELETE_PIC",
  /**设置输入的值 */
  SET_VALUE = "SET_VALUE",
}

/**dispatch 参数类型 */
export interface VenueAction {
  type: VenueType;
  payload?: Partial<VenueStateType>;
}

/**场馆管理redux 数据 */
const initialState: VenueStateType = {
  venueData: {} as VenueDateType,
};

export default function venue(state = initialState, action: VenueAction) {
  const { payload, type } = action;
  switch (type) {
    case VenueType.SET_PIC:
      return {
        ...state,
        venueData: {
          ...state.venueData,
          files: [
            ...(state.venueData.files ?? []),
            ...payload?.venueData!.files,
          ],
        },
      };
    case VenueType.DELETE_PIC:
      const index = payload!.index;
      state.venueData.files.splice(index, 1);
      return {
        ...state,
        venueData: { ...state.venueData, files: state.venueData.files },
      };
    case VenueType.SET_VALUE:
      return {
        ...state,
        venueData: { ...state.venueData, [payload!.coloum!]: payload!.value },
      };
    default:
      return state;
  }
}
