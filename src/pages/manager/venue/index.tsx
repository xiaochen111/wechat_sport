import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useReducer, useState } from "react";
import { AtButton, AtForm, AtImagePicker, AtInput, AtTextarea } from "taro-ui";
import styles from "./index.module.scss";

type ChangeType =
  | "changguan"
  | "shenshiqu"
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

const areaList = {
  province_list: {
    310000: "上海市",
  },
  city_list: {
    310100: "上海市",
  },
  county_list: {
    310101: "黄浦区",
    310104: "徐汇区",
    310105: "长宁区",
    310106: "静安区",
    310107: "普陀区",
    310109: "虹口区",
    310110: "杨浦区",
    310112: "闵行区",
    310113: "宝山区",
    310114: "嘉定区",
    310115: "浦东新区",
    310116: "金山区",
    310117: "松江区",
    310118: "青浦区",
    310120: "奉贤区",
    310151: "崇明区",
  },
};

const customStyle = "background:#1a1a1a; color:#fff;";

const initial = {};

//把对数据的操作封装起来
const reducer = (state, action: Action) => {
  const { type, payload } = action;
  return {
    ...state,
    [type]: payload,
  };
};

const files = [
  {
    url: "https://pic.cnblogs.com/face/1846701/20191026145415.png",
  },
];
const VenuePage: Taro.FC = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const [show, setShow] = useState<boolean>(false);
  const [isDatePopup, setIsDatePopup] = useState<boolean>(true);

  const handleChange = (value: any, type: ChangeType) => {
    // console.log("type: ", type);
    // console.log("value: ", value);
    dispatch({ type, payload: value });
  };

  const openPopup = (type: "Date" | "City") => {
    setShow(true);
    setIsDatePopup(type === "Date");
  };

  return (
    <View className={styles.formModule}>
      <AtForm>
        <AtInput
          name="changguan"
          title="场馆名称"
          type="text"
          onChange={(value) => handleChange(value, "changguan")}
        />
        <AtInput
          name="shenshiqu"
          title="省市区"
          type="text"
          editable={false}
          onClick={() => openPopup("City")}
          onChange={() => {}}
        />
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
          editable={false}
          onClick={() => openPopup("Date")}
          onChange={() => {}}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>公司介绍</View>
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
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>上传图片</View>
          <AtImagePicker
            files={files}
            onChange={(value) => handleChange(value, "shangchuantupian")}
          />
        </View>
        <AtButton customStyle={{ margin: 10 }} type="primary">
          提交
        </AtButton>
      </AtForm>

      {/* 弹窗 */}
      <van-popup
        show={show}
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShow(false)}
      >
        {isDatePopup ? (
          <van-datetime-picker
            type="datetime"
            onconfirm={(e: any) => console.log(e.detail)}
            value={new Date().getTime()}
            oncancel={() => setShow(false)}
          />
        ) : (
          <van-area
            areaList={areaList}
            oncancel={() => setShow(false)}
            onconfirm={(e: any) => console.log(e.detail.values)}
          />
        )}
      </van-popup>
    </View>
  );
};

export default VenuePage;
