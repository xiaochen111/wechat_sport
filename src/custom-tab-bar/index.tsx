import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNav, TabbarStateType, TabbarAction } from "@/reducers/tabbar";
import "./index.scss";
import { CombineType } from "@/reducers";

const CustomTabBar: Taro.FC = () => {
  const dispatch = useDispatch<TabbarAction>();

  const tabber: TabbarStateType = useSelector(
    (state: CombineType) => state.tabber
  );
  const { selected, nomalTabList, mangerTabList, isManger } = tabber;

  useEffect(() => {
    console.log(0);
  }, []);

  const switchTab = (item: any, index: number) => {
    dispatch({
      type: setNav.SET_CURRENT,
      payload: { selected: index },
    } as TabbarAction);
    const url = item.pagePath;
    Taro.switchTab({
      url,
    });
  };

  // 自定义 tabBar的页面
  return (
    <CoverView className="tab-bar">
      <CoverView className="tab-bar-wrap">
        {(isManger ? mangerTabList : nomalTabList).map((item, index) => {
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
                  color: selected === index ? "#333" : "#999",
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    </CoverView>
  );
};
export default CustomTabBar;
