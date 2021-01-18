import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNav, TabbarStateType } from "@/reducers/tabbar";
import "./index.scss";

const CustomTabBar: Taro.FC = () => {
  const dispatch = useDispatch();

  const tabber: TabbarStateType = useSelector((state) => state.tabber);
  const { selected, tabList } = tabber;

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
        {tabList.map((item, index) => {
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
      {/* <CoverImage
          className="intellect-icon"
          src={Intellect}
          onClick={this.jumpIntellect}
        /> */}
    </CoverView>
  );
};
export default CustomTabBar;
// export default connect(
//   ({ tabbar }: any) => ({ tabbar }),
//   (dispatch: Dispatch) => ({ dispatch })
// )(CustomTabBar);
