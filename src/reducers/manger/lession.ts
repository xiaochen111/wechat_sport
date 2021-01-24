export interface LessionStateType {
  /**关联场馆 */
  venueId: string;
  /**课程名称 */
  name: string;
  /**课程简介 */
  descript: string;
  /**课程详细介绍 */
  descriptMore: string;
  /**课程开始时间 */
  startTime: string;
  /**课程结束时间 */
  endTime: string;
  /**课程价格 */
  price: string;
  /**课程地址 */
  address: string;
  /**主图ID 前端定义接口是list 注意后端接收是number类型*/
  mainPic: any[];
  /** 场馆课程对应的图片ID(去除主图)*/
  files: any[];
  /**1-正常 0-关闭 */
  status: number;
}

export type LessionKeys = keyof LessionStateType;

/**校验字端 */
type LessionDateRequire = Record<LessionKeys, { errMsg: string; patter?: any }>;
export const checkLessionColoumns: LessionDateRequire = {
  venueId: { errMsg: "请选择场馆" },
  name: { errMsg: "课程名称不能为空" },
  descript: { errMsg: "请输入课程简介" },
  descriptMore: { errMsg: "请输入课程详细介绍" },
  address: { errMsg: "课程地址不能为空" },
  startTime: { errMsg: "开始时间不能为空" },
  endTime: { errMsg: "介绍时间不能为空" },
  files: { errMsg: "场馆图片不能为空" },
  status: { errMsg: "请选择状态" },
  price: { errMsg: "请输入课程价格" },
  mainPic: { errMsg: "请上传主图" },
};

/**场馆数据类型 */
export interface LessionAllStateType {
  lessionData: LessionStateType;
  coloum?: LessionKeys;
  [key: string]: any;
}

/** 场馆type 类型 */
export enum LessionActionType {
  /**上传成功后设置主图片 */
  SET_MAIN_PIC = "SET_MAIN_PIC",
  /**删除主图片 */
  DELETE_MAIN_PIC = "DELETE_MAIN_PIC",
  /**上传成功后设置图片 */
  SET_FILES_PIC = "SET_FILES_PIC",
  /**点击删除图片 */
  DELETE_PIC = "DELETE_PIC",
  /**设置输入的值 */
  SET_VALUE = "SET_VALUE",
}

/**dispatch 参数类型 */
export interface LessionAction {
  type: LessionActionType;
  payload?: Partial<LessionAllStateType>;
}

/**场馆管理redux 数据 */
const initialState: LessionAllStateType = {
  lessionData: {} as LessionStateType,
};

export default function lession(state = initialState, action: LessionAction) {
  const { payload, type } = action;
  switch (type) {
    case LessionActionType.SET_MAIN_PIC:
      return {
        ...state,
        lessionData: {
          ...state.lessionData,
          mainPic: payload?.lessionData!.mainPic!,
        },
      };
    case LessionActionType.DELETE_MAIN_PIC:
      return {
        ...state,
        lessionData: {
          ...state.lessionData,
          mainPic: "",
        },
      };
    case LessionActionType.SET_FILES_PIC:
      return {
        ...state,
        lessionData: {
          ...state.lessionData,
          files: [
            ...(state.lessionData.files ?? []),
            ...payload?.lessionData?.files!,
          ],
        },
      };
    case LessionActionType.DELETE_PIC:
      const index = payload!.index;
      state.lessionData.files.splice(index, 1);
      return {
        ...state,
        lessionData: { ...state.lessionData, files: state.lessionData.files },
      };
    case LessionActionType.SET_VALUE:
      return {
        ...state,
        lessionData: {
          ...state.lessionData,
          [payload!.coloum!]: payload!.value,
        },
      };
    default:
      return state;
  }
}
