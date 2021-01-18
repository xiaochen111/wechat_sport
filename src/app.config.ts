export default {
  pages: [
    "pages/home/index",
    "pages/manager/venue/index",
    "pages/lessionDetail/index",
    "pages/authorize/index",
    "pages/authorize/login/index",
    "pages/me/index",
    "pages/manager/index",
    "pages/venueDetail/index",
    "pages/shop/index",
    "pages/demo/index",
    "pages/index/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    backgroundColor: "#fff",
    color: "#999",
    selectedColor: "#d43a3c",
    list: [
      {
        text: "订单",
        pagePath: "pages/home/index",
        iconPath: "images/order-icon.png",
        selectedIconPath: "images/order-icon-active.png",
      },
      {
        text: "管理",
        pagePath: "pages/manager/index",
        iconPath: "images/manager.png",
        selectedIconPath: "images/manager.png",
      },
      {
        text: "我的",
        pagePath: "pages/me/index",
        iconPath: "images/my-icon.png",
        selectedIconPath: "images/my-icon-active.png",
      },
    ],
  },
  usingComponents: {
    customtabbar: "custom-tab-bar/index",
  },
};