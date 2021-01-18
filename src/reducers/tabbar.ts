export enum setNav {
  SET_CURRENT = "SET_CURRENT",
}

export interface TabbarStateType {
  selected: number;
  tabList: any[];
}

const INITIAL_STATE: TabbarStateType = {
  selected: 0,
  tabList: [
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
};

export default function tabber(
  state = INITIAL_STATE,
  action: { type: setNav; payload: any }
) {
  const { payload, type } = action;

  switch (type) {
    case setNav.SET_CURRENT:
      return {
        ...state,
        selected: payload.selected,
      };

    default:
      return state;
  }
}
