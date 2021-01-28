import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { AtButton } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { CombineType } from "@/reducers";
import styles from "./index.module.scss";
import Tabs from "./Tabs";

const Trainer: Taro.FC = () => {
  return (
    <View className={styles.listContainer}>
      {new Array(8).fill("").map((item: any, i: number) => (
        <View className={styles.item} key={i}>
          <View className={styles.introLeft}>
            <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
            <View className={styles.intro}>
              <View className={styles.lession}>私教</View>
              <View className={styles.datePrice}>¥200</View>
            </View>
          </View>
          <View>
            <AtButton size="small" type="primary">
              预定
            </AtButton>
          </View>
        </View>
      ))}
    </View>
  );
};

const ShopPage: Taro.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const state: CombineType = useSelector((s) => s);
  return (
    <View>
      <Swiper
        className={styles.swiper}
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className={styles.swiperItem}>场馆图1</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>场馆图2</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>场馆图3</View>
        </SwiperItem>
      </Swiper>

      <View className={styles.cantact}>
        <View>地址:上海浦东新区。。</View>
        <View>电话：021-2323332332</View>
      </View>

      <View className={styles.chioseModule}>
        <Text
          className={`${styles.chisoeOne} ${
            current === 0 ? styles.current : ""
          }`}
          onClick={() => setCurrent(0)}
        >
          课程
        </Text>
        <Text
          className={`${styles.chisoeOne} ${
            current === 1 ? styles.current : ""
          }`}
          onClick={() => setCurrent(1)}
        >
          私教
        </Text>
      </View>
      {current === 0 ? <Tabs /> : <Trainer />}
    </View>
  );
};

export default ShopPage;
