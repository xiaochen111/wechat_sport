export type VenueColoumn =
  | "name"
  | "shenshiqu"
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
  | "chargingType"
  | "shangchuantupian";

type VenueDateType = Record<VenueColoumn, any>;

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
          ...state,
          venueData: [...state.venueData.files, ...payload!.venueData!.files!],
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
