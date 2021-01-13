import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import React from "react";

import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

const VenuePage: Taro.FC = () => {
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
          <View className={styles.swiperItem}>场馆图片1</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>场馆图片2</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>场馆图片3</View>
        </SwiperItem>
      </Swiper>

      <View className={styles.cantact}>
        <View>地址:上海浦东新区。。</View>
        <View>电话：021-2323332332</View>
      </View>

      <View className={styles.listContainer}>
        <View className={styles.item}>
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
        <View className={styles.item}>
          <View className={styles.introLeft}>
            <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
            <View className={styles.intro}>
              <View className={styles.lession}>舞蹈</View>
              <View className={styles.datePrice}>12:00~14:00</View>
            </View>
          </View>
          <View>
            <AtButton size="small" type="primary">
              预定
            </AtButton>
          </View>
        </View>

        <View className={styles.lessionTitle}>场地介绍</View>
        <View className={styles.module}>
          <View className={styles.lessionIntro}>
            课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍
          </View>
        </View>
      </View>
    </View>
  );
};

Taro.setNavigationBarColor({
  frontColor: "#ffffff",
  backgroundColor: "#1a1a1a",
  animation: {
    duration: 400,
    timingFunc: "easeIn",
  },
});

export default VenuePage;
