import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import React, { useState } from "react";
import { AtList, AtListItem, AtSearchBar } from "taro-ui";

interface CombineVenueType {
  list: any[];
  handleItem: (params: any) => void;
  handleSearch: (name: string) => void;
}

const CombineVenue: Taro.FC<CombineVenueType> = ({
  list,
  handleItem,
  handleSearch,
}) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: any) => {
    setValue(e);
  };
  const onClear = () => {
    setValue("");
    handleSearch("");
  };
  const setCurrentItem = (item: any) => {
    handleItem(item);
  };

  return (
    <View>
      <AtSearchBar
        actionName="搜索"
        value={value}
        onChange={onChange}
        onActionClick={() => handleSearch(value)}
        onClear={onClear}
      />
      <ScrollView scrollY style={{ height: "60vh", background: "#fff" }}>
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
