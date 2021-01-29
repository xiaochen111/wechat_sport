import { JyObj } from "./venue";

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
  [key: string]: any;
}

export type LessionKeys = keyof LessionStateType;

type LessionDateRequire = Record<LessionKeys, JyObj>;
/**校验字端 */
export const checkLessionColoumns: LessionDateRequire = {
  venueId: { errMsg: "请选择场馆" },
  name: { errMsg: "课程名称不能为空" },
  descript: { errMsg: "请输入课程简介" },
  descriptMore: { errMsg: "请输入课程详细介绍" },
  address: { errMsg: "课程地址不能为空" },
  startTime: { errMsg: "开始时间不能为空" },
  endTime: { errMsg: "结束时间不能为空" },
  files: {
    errMsg: "场馆图片不能为空",
    patter: {
      fn: (list: any[]) => Boolean(list.length),
      msg: "场馆图片不能为空",
    },
  },
  status: { errMsg: "请选择状态" },
  price: { errMsg: "请输入课程价格" },
  mainPic: {
    errMsg: "主图片不能为空",
    patter: {
      fn: (list: any[]) => Boolean(list.length),
      msg: "主图片不能为空",
    },
  },
};

/**场馆数据类型 */
export interface LessionAllStateType {
  lessionData: LessionStateType;
  coloum?: LessionKeys;
  isEidt: boolean;
  [key: string]: any;
}

/** 课程type 类型 */
export enum LessionActionType {
  /**上传成功后设置主图片 */
  SET_MAIN_PIC = "SET_MAIN_PIC",
  /**删除主图片 */
  DELETE_MAIN_PIC = "DELETE_MAIN_PIC",
  /**上传成功后设置图片 */
  SET_FILES_PIC = "SET_FILES_PIC",
  /**点击删除图片 */
  DELETE_LESSION_PIC = "DELETE_LESSION_PIC",
  /**设置输入的值 */
  SET_LESSION_VALUE = "SET_LESSION_VALUE",
  /**修改课程信息时，初始化信息 */
  EIDT_LESSION_INIT_DATA = "EIDT_LESSION_INIT_DATA",
  /**新增课程 */
  ADD_LIESSION = "ADD_LIESSION",
}

/**dispatch 参数类型 */
export interface LessionAction {
  type: LessionActionType;
  payload?: Partial<LessionAllStateType>;
}

// type DeepPartial<T> = {
//   [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
// };

/**场馆管理redux 数据 */
const initialState: LessionAllStateType = {
  lessionData: { status: 0 } as LessionStateType,
  isEidt: false,
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
          mainPic: [],
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
    case LessionActionType.DELETE_LESSION_PIC:
      const index = payload!.index;
      state.lessionData.files.splice(index, 1);
      return {
        ...state,
        lessionData: { ...state.lessionData, files: state.lessionData.files },
      };
    case LessionActionType.SET_LESSION_VALUE:
      return {
        ...state,
        lessionData: {
          ...state.lessionData,
          [payload!.coloum!]: payload!.value,
        },
      };
    case LessionActionType.EIDT_LESSION_INIT_DATA:
      return {
        ...state,
        lessionData: payload?.lessionData!,
        isEidt: true,
      };
    case LessionActionType.ADD_LIESSION:
      return {
        ...state,
        lessionData: { status: 0 } as LessionStateType,
        isEidt: false,
      };
    default:
      return state;
  }
}
