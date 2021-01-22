import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { useSelector } from "react-redux";
import { CombineType } from "@/reducers";
import { TabbarStateType } from "@/reducers/tabbar";
import SysHome from "@/pages/syshome/index";
import HomePage from "@/pages/home/wechatHome";

const IndexPage: Taro.FC = () => {
  const tabber: TabbarStateType = useSelector(
    (state: CombineType) => state.tabber
  );
  const { isManger } = tabber;
  console.log("isManger: ", isManger);

  return <View>{isManger ? <SysHome /> : <HomePage />}</View>;
};

export default IndexPage;
