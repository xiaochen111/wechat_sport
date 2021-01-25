import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import React from "react";
import { AtList, AtListItem, AtSearchBar } from "taro-ui";

interface CombineVenueType {
  list: any[];
  handleItem: (params: any) => void;
}

const CombineVenue: Taro.FC<CombineVenueType> = ({ list, handleItem }) => {
  const onChange = (e: any) => {
    console.log("e: ", e);
  };
  const onConfirm = () => {
    console.log("e: ");
  };
  const setCurrentItem = (item: any) => {
    console.log("e: ===>", item);
    handleItem(item);
  };

  return (
    <View>
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
            <AtListItem
              title={item.name}
              key={item.id}
              onClick={() => setCurrentItem(item)}
            />
          ))}
        </AtList>
      </ScrollView>
    </View>
  );
};

export default CombineVenue;
