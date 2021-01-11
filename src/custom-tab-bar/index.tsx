import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../reducers/tabbar";
import "./index.scss";

const navList: any[] = [
  {
    text: "首页",
    pagePath: "/pages/home/index",
    iconPath: "../images/order-icon.png",
    selectedIconPath: "../images/order-icon-active.png",
  },
  {
    text: "管理",
    pagePath: "/pages/manager/index",
    iconPath: "../images/order-icon.png",
    selectedIconPath: "../images/order-icon-active.png",
  },
  {
    text: "我的",
    pagePath: "/pages/lessionDetail/index",
    iconPath: "../images/my-icon.png",
    selectedIconPath: "../images/my-icon-active.png",
  },
];

const CustomTabBar: Taro.FC = (props: any) => {
  const [list, setList] = useState<any[]>(navList);
  const dispatch = useDispatch();

  const tabber = useSelector((state) => state.tabber);
  const { selected } = tabber;
  console.log("selected: ", selected);

  const switchTab = (item: any, index: number) => {
    dispatch({
      type: setNav.SET_CURRENT,
      payload: { selected: index },
    });
    const url = item.pagePath;
    Taro.switchTab({
      url,
    });
  };

  // 自定义 tabBar的页面

  return (
    <CoverView className="tab-bar">
      <CoverView className="tab-bar-wrap">
        {list.map((item, index) => {
          return (
            <CoverView
              className="tab-bar-wrap-item"
              onClick={() => switchTab(item, index)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage
                className="tab-bar-wrap-item-icon"
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                className="tab-bar-wrap-item-btn"
                style={{
                  color: selected === index ? "#ed6c00" : "#666",
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
      {/* <CoverImage
          className="intellect-icon"
          src={Intellect}
          onClick={this.jumpIntellect}
        /> */}
    </CoverView>
  );
};
export default CustomTabBar;
