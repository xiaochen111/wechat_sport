import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

const CoachPage: Taro.FC = () => {
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
          <View className={styles.swiperItem}>教练图1</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>教练图2</View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles.swiperItem}>教练图3</View>
        </SwiperItem>
      </Swiper>

      <View className={styles.mainContainer}>
        <View className={styles.lessionTitle}>课程详情</View>
        <View className={styles.module}>
          <View className={styles.introLeft}>
            <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
            <View className={styles.intro}>
              <View className={styles.lession}>私教</View>
              <View className={styles.datePrice}>
                私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍私教介绍
              </View>
            </View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="location-o" />
              地点：
            </View>
            <View className={styles.value}>上海浦东新区。。。</View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="balance-o" />
              价格目录：
            </View>
            <View className={styles.value}>20课 30/40时</View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="clock-o" />
              时间：
            </View>
            <View className={styles.value}>根据线下时间计算费用</View>
          </View>
        </View>

        <View className={styles.lessionTitle}>课程介绍</View>
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

export default CoachPage;
