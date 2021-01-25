import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import React from "react";
import { AtList, AtListItem, AtSearchBar } from "taro-ui";

interface CombineVenueType {
  list: any[];
}

const CombineVenue: Taro.FC<CombineVenueType> = ({ list }) => {
  const onChange = (e: any) => {
    console.log("e: ", e);
  };
  const onConfirm = () => {
    console.log("e: ");
  };

  return (
    <View onClick={(e) => console.log(e)}>
      <AtSearchBar
        actionName="搜一下"
        value=""
        onChange={onChange}
        onConfirm={onConfirm}
      />
      <ScrollView
        scrollY
        // onScrollToLower={onScrollToLower}
        style={{ height: "60vh", background: "#fff" }}
      >
        <AtList>
          {list.map((item: any) => (
            <AtListItem title="222" />
          ))}
        </AtList>
      </ScrollView>
    </View>
  );
};

export default CombineVenue;
