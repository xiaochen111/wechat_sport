interface VenueDateType {
  /**场馆名称 */
  name: string;
  /**省 */
  province: string;
  /**市 */
  city: string;
  /**区 */
  district: string;
  /**详细地址 */
  address: string;
  /**电话 */
  tel: string;
  /**开始营业时间  */
  startTime: string;
  /**结束营业时间  */
  endTime: string;
  /**场地介绍  */
  description: string;
  /**场馆类型  */
  gymType: string;
  /**计费类型  */
  chargingType: number;
  /**主图片  */
  mainPic: any[];
  /**上传的图片  */
  files: any[];
}

export type VenueColoumn = keyof VenueDateType;
export type JyObj = {
  errMsg: string;
  patter?: { rege?: RegExp; fn?: (parms: any) => boolean; msg: string };
};
/**校验字端 */
type VenueDateRequire = Record<VenueColoumn, JyObj>;
export const checkColoumns: VenueDateRequire = {
  name: { errMsg: "场馆不能为空" },
  province: { errMsg: "省不能为空" },
  city: { errMsg: "市不能为空" },
  district: { errMsg: "区不能为空" },
  address: { errMsg: "地址不能为空" },
  tel: {
    errMsg: "电话不能为空",
    patter: { rege: /^((\d{3,4})|\d{3,4}-|s)?\d{7,14}$/, msg: "电话格式不对" },
  },
  startTime: { errMsg: "开始时间不能为空" },
  endTime: { errMsg: "介绍时间不能为空" },
  description: { errMsg: "场地介绍不能为空" },
  gymType: { errMsg: "场馆类型不能为空" },
  files: {
    errMsg: "场馆图片不能为空",
    patter: {
      fn: (list: any[]) => Boolean(list.length),
      msg: "场馆图片不能为空",
    },
  },
  mainPic: {
    errMsg: "主图片不能为空",
    patter: {
      fn: (list: any[]) => Boolean(list.length),
      msg: "主图片不能为空",
    },
  },
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
  /**上传主图片成功后添加图片 */
  SET_VENUN_MAIN_PIC = "SET_VENUN_MAIN_PIC",
  /** 删除主图片 */
  DELETE_VENUN_MAIN_PIC = "DELETE_VENUN_MAIN_PIC",
  /**上传成功后添加图片 */
  SET_VENUN_PIC = "SET_VENUN_PIC",
  /**点击删除图片 */
  DELETE_VENUN_PIC = "DELETE_VENUN_PIC",
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
    case VenueType.SET_VENUN_PIC:
      return {
        ...state,
        venueData: {
          ...state.venueData,
          files: [
            ...(state.venueData.files ?? []),
            ...payload?.venueData!.files!,
          ],
        },
      };
    case VenueType.SET_VENUN_MAIN_PIC:
      return {
        ...state,
        venueData: {
          ...state.venueData,
          mainPic: payload?.venueData!.mainPic!,
        },
      };
    case VenueType.DELETE_VENUN_MAIN_PIC:
      return {
        ...state,
        venueData: {
          ...state.venueData,
          mainPic: [],
        },
      };
    case VenueType.DELETE_VENUN_PIC:
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
