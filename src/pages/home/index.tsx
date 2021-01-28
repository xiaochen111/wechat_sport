import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CombineType } from "@/reducers";
import { TabbarStateType } from "@/reducers/tabbar";
import SysHome from "@/pages/syshome/index";
import HomePage from "@/pages/home/wechatHome";
import { getDictData } from "@/actions/global";

const IndexPage: Taro.FC = () => {
  const dispatch = useDispatch();
  const tabber: TabbarStateType = useSelector(
    (state: CombineType) => state.tabber
  );
  const { isManger } = tabber;

  useEffect(() => {
    dispatch({
      thunk: getDictData(),
    });
  }, []);

  return <View>{isManger ? <SysHome /> : <HomePage />}</View>;
};

export default IndexPage;
