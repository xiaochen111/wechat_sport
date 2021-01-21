import { Image, Slot, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import styles from "./index.module.scss";

const SysHome: Taro.FC = () => {
  const onChange = (e: any) => {
    console.log("value: ", e.detail);
  };

  const option = [
    { text: "场馆", value: 0 },
    { text: "课程", value: 1 },
    { text: "私教", value: 2 },
  ];
  return (
    <View className={styles.sysHome}>
      <van-dropdown-menu>
        <van-dropdown-item value={0} options={option} onChange={onChange} />
      </van-dropdown-menu>
      <View className={styles.listItem}>
        <van-swipe-cell rightWidth={65}>
          <View className={styles.itemMain}>
            <Image src="https://pic.cnblogs.com/face/1846701/20191026145415.png"></Image>
            <View className={styles.rightMain}>
              <View>场馆名称1</View>
              <View>省市区</View>
              <View>18068037623</View>
              <View>浦东新区世纪大道东方路1999号</View>
              <View>2020-01-10 12:30</View>
              <View>23</View>
            </View>
          </View>
          <Slot name="right">删除</Slot>
        </van-swipe-cell>
      </View>
    </View>
  );
};

export default SysHome;
