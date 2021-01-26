import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { VenueAction, VenueType } from "@/reducers/manger/venue";
import React from "react";
import { useDispatch } from "react-redux";
import { AtList, AtListItem } from "taro-ui";

const ManagerPage: Taro.FC = () => {
  const dispatch = useDispatch();
  const toManagerPage = (type: number) => {
    dispatch({
      type: VenueType.ADD_VENUN,
    } as VenueAction);
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
