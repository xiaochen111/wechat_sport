/**
 * tabbar action type 类型
 */
export enum setNav {
  /**
   * 设置当前选中的tab
   */
  SET_CURRENT = "SET_CURRENT",
  /**
   * 设置微信用户的tab or 管理员的tab
   */
  SET_TABBAR_STYLE = "SET_TABBAR_STYLE",
}

/** dispatch 参数类型 */
export interface TabbarAction {
  type: setNav;
  payload?: Partial<TabbarStateType>;
}

/**
 * tab的redux数据
 */
export interface TabbarStateType {
  /**当前选中第几个 */
  selected: number;
  nomalTabList: any[];
  mangerTabList: any[];
  /** 是否是管理员的tabbar*/
  isManger: boolean;
}

const INITIAL_STATE: TabbarStateType = {
  selected: 0,
  nomalTabList: [
    {
      text: "首页",
      pagePath: "/pages/home/index",
      iconPath: "../images/home.png",
      selectedIconPath: "../images/home-active.png",
    },
    {
      text: "我的",
      pagePath: "/pages/me/index",
      iconPath: "../images/me.png",
      selectedIconPath: "../images/me-active.png",
    },
  ],
  mangerTabList: [
    {
      text: "首页",
      pagePath: "/pages/home/index",
      iconPath: "../images/home.png",
      selectedIconPath: "../images/home-active.png",
    },
    {
      text: "管理",
      pagePath: "/pages/manager/index",
      iconPath: "../images/manager.png",
      selectedIconPath: "../images/manager-active.png",
    },
    {
      text: "我的",
      pagePath: "/pages/me/index",
      iconPath: "../images/me.png",
      selectedIconPath: "../images/me-active.png",
    },
  ],
  isManger: true,
};

export default function tabber(state = INITIAL_STATE, action: TabbarAction) {
  const { payload, type } = action;

  switch (type) {
    case setNav.SET_CURRENT:
      return {
        ...state,
        selected: payload!.selected,
      };
    case setNav.SET_TABBAR_STYLE:
      return {
        ...state,
        isManger: payload!.isManger,
      };
    default:
      return state;
  }
}
