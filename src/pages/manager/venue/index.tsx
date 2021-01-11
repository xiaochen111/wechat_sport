import { Picker, View } from "@tarojs/components";
import React, { useReducer } from "react";
import Taro from "@tarojs/taro";
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtInput,
  AtList,
  AtListItem,
  AtTextarea,
} from "taro-ui";

type ChangeType =
  | "changguan"
  | "shen"
  | "shi"
  | "qu"
  | "dizhi"
  | "dianhua"
  | "yinyeshijian"
  | "changdijieshao"
  | "fenlei"
  | "anfenjifei"
  | "shangchuantupian";
type Action = {
  type: ChangeType;
  payload?: any;
};

const initial = {};

//把对数据的操作封装起来
const reducer = (state, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "changguan":
      return {
        ...state,
        [type]: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const selector = ["美国", "中国", "巴西", "日本"];
const files = [
  {
    url: "https://pic.cnblogs.com/face/1846701/20191026145415.png",
  },
];

const VenuePage: Taro.FC = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  const handleChange = (value: any, type: ChangeType) => {
    // console.log("type: ", type);
    // console.log("value: ", value);
    dispatch({ type, payload: value });
  };

  return (
    <View>
      <AtForm>
        <AtInput
          name="changguan"
          title="场馆名称"
          type="text"
          onChange={(value) => handleChange(value, "changguan")}
        />
        <Picker
          mode="selector"
          range={selector}
          value={0}
          onChange={(value) => handleChange(value, "shen")}
        >
          <AtList>
            <AtListItem title="省" extraText="美国" />
          </AtList>
        </Picker>
        <Picker
          mode="selector"
          range={selector}
          value={0}
          onChange={(value) => handleChange(value, "shi")}
        >
          <AtList>
            <AtListItem title="市" extraText="美国" />
          </AtList>
        </Picker>
        <Picker
          mode="selector"
          range={selector}
          value={0}
          onChange={(value) => handleChange(value, "qu")}
        >
          <AtList>
            <AtListItem title="区" extraText="美国" />
          </AtList>
        </Picker>
        <AtInput
          name="changguan"
          title="地址"
          type="text"
          onChange={(value) => handleChange(value, "dizhi")}
        />
        <AtInput
          name="changguan"
          title="电话"
          type="text"
          onChange={(value) => handleChange(value, "dianhua")}
        />
        <AtInput
          name="changguan"
          title="营业时间"
          type="text"
          onChange={(value) => handleChange(value, "yinyeshijian")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2 }}>公司介绍</View>
          <AtTextarea
            value=""
            onChange={(value) => handleChange(value, "yinyeshijian")}
          />
        </View>
        <AtInput
          name="changguan"
          title="分类"
          type="text"
          onChange={(value) => handleChange(value, "fenlei")}
        />
        <AtInput
          name="changguan"
          title="按分计费"
          type="text"
          onChange={(value) => handleChange(value, "anfenjifei")}
        />
        <View style={{ lineHeight: 2, padding: "0 10px" }}>上传图片</View>
        <AtImagePicker
          files={files}
          onChange={(value) => handleChange(value, "shangchuantupian")}
        />
        <AtButton>提交</AtButton>
      </AtForm>
    </View>
  );
};

export default VenuePage;
