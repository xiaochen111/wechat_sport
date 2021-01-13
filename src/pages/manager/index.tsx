import { View } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";

const ManagerPage: Taro.FC = () => {
  const toManagerPage = (type: number) => {
    console.log("type: ", type);
    Taro.navigateTo({ url: "/pages/manager/venue/index" });
  };

  return (
    <View>
      <AtList>
        <AtListItem
          title="场馆信息"
          arrow="right"
          onClick={() => toManagerPage(0)}
        />
        <AtListItem
          title="课程信息"
          arrow="right"
          onClick={() => toManagerPage(1)}
        />
        <AtListItem
          title="私教信息"
          arrow="right"
          onClick={() => toManagerPage(2)}
        />
      </AtList>
    </View>
  );
};

// Taro.setNavigationBarTitle({
//   title: "MANGER PAGE",
// });

// Taro.setNavigationBarColor({
//   frontColor: "#ffffff",
//   backgroundColor: "#1a1a1a",
//   animation: {
//     duration: 400,
//     timingFunc: "easeIn",
//   },
// });

export default ManagerPage;
