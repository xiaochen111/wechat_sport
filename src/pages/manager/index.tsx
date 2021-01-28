import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { VenueAction, VenueType } from "@/reducers/manger/venue";
import React from "react";
import { useDispatch } from "react-redux";
import { AtList, AtListItem } from "taro-ui";
import { LessionAction, LessionActionType } from "@/reducers/manger/lession";
import {
  PersonTarlarType,
  PersonTralarAction,
} from "@/reducers/manger/personTralar";
import { ListType } from "@/reducers/manger/indexManger";

const ManagerPage: Taro.FC = () => {
  const dispatch = useDispatch();
  const toManagerPage = (type: ListType) => {
    if (type === ListType.venue) {
      dispatch({
        type: VenueType.ADD_VENUN,
      } as VenueAction);
      Taro.navigateTo({ url: "/pages/manager/venue/index" });
    }
    if (type === ListType.lession) {
      dispatch({
        type: LessionActionType.ADD_LIESSION,
      } as LessionAction);
      Taro.navigateTo({ url: "/pages/manager/lession/index" });
    }
    if (type === ListType.persionTralar) {
      dispatch({
        type: PersonTarlarType.ADD_PERSON_TRALAR,
      } as PersonTralarAction);
      Taro.navigateTo({ url: "/pages/manager/personTralar/index" });
    }
  };

  return (
    <View>
      <AtList>
        <AtListItem
          title="场馆信息"
          arrow="right"
          onClick={() => toManagerPage(ListType.venue)}
        />
        <AtListItem
          title="课程信息"
          arrow="right"
          onClick={() => toManagerPage(ListType.lession)}
        />
        <AtListItem
          title="私教信息"
          arrow="right"
          onClick={() => toManagerPage(ListType.persionTralar)}
        />
      </AtList>
    </View>
  );
};

export default ManagerPage;
