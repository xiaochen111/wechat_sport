import { JyObj } from "./venue";

interface PersonTralarDateVo {
  /**关联场馆 */
  venueId: string;
  /**私教主题 */
  coashTheme: string;
  /**私教名字 */
  coashName: string;
  /**私教介绍 */
  coashDescript: string;
  /**私教显示价格(字符串) */
  price: string;
  /**收费目录 */
  priceDirectory: string;
  /**开始营业时间  */
  startTime: string;
  /**结束营业时间  */
  endTime: string;
  /**地点  */
  address: string;
  /**主图片  */
  mainPic: any[];
  /**上传的图片  */
  files: any[];
  /**1-正常 0-关闭 */
  status: number;
}

export interface PersonTralarDateType extends PersonTralarDateVo {
  [key: string]: any;
}

export type PersonTralarColoumn = keyof PersonTralarDateVo;

/**校验字端 */
type PersonTralarDateRequire = Record<PersonTralarColoumn, JyObj>;
export const checkPersonTralarColoumns: PersonTralarDateRequire = {
  venueId: { errMsg: "场馆不能为空" },
  address: { errMsg: "地址不能为空" },
  startTime: { errMsg: "开始时间不能为空" },
  endTime: { errMsg: "结束时间不能为空" },
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
  coashDescript: { errMsg: "私教介绍不能为空" },
  coashName: { errMsg: "私教名字不能为空" },
  coashTheme: { errMsg: "私教主题不能为空" },
  price: { errMsg: "显示价不能为空" },
  priceDirectory: { errMsg: "收费目录不能为空" },
  status: { errMsg: "请选择状态" },
};

/**私教数据类型 */
export interface PersonTralarStateType {
  personTralarData: PersonTralarDateType;
  coloum?: PersonTralarColoumn;
  isEidt: boolean;
  [key: string]: any;
}

/** 场馆type 类型 */
export enum PersonTarlarType {
  /**上传主图片成功后添加图片 */
  SET_PERSON_TRALAR_MAIN_PIC = "SET_PERSON_TRALAR_MAIN_PIC",
  /** 删除主图片 */
  DELETE_PERSON_TRALAR_MAIN_PIC = "DELETE_PERSON_TRALAR_MAIN_PIC",
  /**上传成功后添加图片 */
  SET_PERSON_TRALAR_PIC = "SET_PERSON_TRALAR_PIC",
  /**点击删除图片 */
  DELETE_PERSON_TRALAR_PIC = "DELETE_PERSON_TRALAR_PIC",
  /**设置输入的值 */
  SET_PERSON_TRALAR_VALUE = "SET_PERSON_TRALAR_VALUE",
  /**编辑私教时初始化数据 */
  EIDT_PERSON_TRALAR_INIT_DATA = "EIDT_PERSON_TRALAR_INIT_DATA",
  /**新增私教 */
  ADD_PERSON_TRALAR = "ADD_PERSON_TRALAR",
}

/**dispatch 参数类型 */
export interface PersonTralarAction {
  type: PersonTarlarType;
  payload?: Partial<PersonTralarStateType>;
}

/**私教管理redux 数据 */
const initialState: PersonTralarStateType = {
  personTralarData: { status: 0 } as PersonTralarDateType,
  isEidt: false,
};

export default function personTralar(
  state = initialState,
  action: PersonTralarAction
) {
  const { payload, type } = action;
  switch (type) {
    case PersonTarlarType.SET_PERSON_TRALAR_PIC:
      return {
        ...state,
        personTralarData: {
          ...state.personTralarData,
          files: [
            ...(state.personTralarData.files ?? []),
            ...payload?.personTralarData!.files!,
          ],
        },
      };
    case PersonTarlarType.SET_PERSON_TRALAR_MAIN_PIC:
      return {
        ...state,
        personTralarData: {
          ...state.personTralarData,
          mainPic: payload?.personTralarData!.mainPic!,
        },
      };
    case PersonTarlarType.DELETE_PERSON_TRALAR_MAIN_PIC:
      return {
        ...state,
        personTralarData: {
          ...state.personTralarData,
          mainPic: [],
        },
      };
    case PersonTarlarType.DELETE_PERSON_TRALAR_PIC:
      const index = payload!.index;
      state.personTralarData.files.splice(index, 1);
      return {
        ...state,
        personTralarData: {
          ...state.personTralarData,
          files: state.personTralarData.files,
        },
      };
    case PersonTarlarType.SET_PERSON_TRALAR_VALUE:
      return {
        ...state,
        personTralarData: {
          ...state.personTralarData,
          [payload!.coloum!]: payload!.value,
        },
      };
    case PersonTarlarType.EIDT_PERSON_TRALAR_INIT_DATA:
      return {
        ...state,
        personTralarData: payload?.personTralarData!,
        isEidt: true,
      };
    case PersonTarlarType.ADD_PERSON_TRALAR:
      return {
        ...state,
        personTralarData: { status: 0 } as PersonTralarDateType,
        isEidt: false,
      };
    default:
      return state;
  }
}
