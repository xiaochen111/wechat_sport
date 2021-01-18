import { Slot, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Demo: Taro.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const [show, setShow] = useState<boolean>(false);
  // console.log('counter: ', counter);
  const add = () => {
    dispatch({
      type: "ADD",
    });
  };

  return (
    <View>
      <View>{counter.num}</View>
      <View onClick={add}>add</View>
      <van-button type="primary" onClick={() => setShow(true)}>
        显示日历
      </van-button>
      <van-datetime-picker type="datetime" value={new Date().getTime()} />
      {/* <van-calendar
        show={show}
        showConfirm
        type="range"
        onClose={() => console.log("---")}
        onConfirm={() => console.log("---")}
      >
        <Slot name="title">
          <View>Hello world</View>
        </Slot>
      </van-calendar> */}
    </View>
  );
};

// Demo.config = {
//   navigationBarTitleText: "提柜",
//   // disableScroll: true,
//   // usingComponents: {
//   //   "van-datetime-picker": "../../components/vant/datetime-picker/index",
//   // },
// };

export default Demo;
