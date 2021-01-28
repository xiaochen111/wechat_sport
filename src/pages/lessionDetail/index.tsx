import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { CombineType } from "@/reducers";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

const CoachPage: Taro.FC = () => {
  const state: CombineType = useSelector((s) => s);
  const {
    shop: { currentLession },
  } = state;

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
        {currentLession.files.map((item: any) => (
          <SwiperItem key={item.id}>
            <View className={styles.swiperItem}>
              <Image src={item.fileAllPath} style={{ width: "100%" }} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles.mainContainer}>
        <View className={styles.lessionTitle}>课程详情</View>
        <View className={styles.module}>
          <View className={styles.introLeft}>
            <Image src={currentLession.mainPicUrl} />
            <View className={styles.intro}>
              <View className={styles.lession}>{currentLession.name}</View>
              <View className={styles.datePrice}>
                {currentLession.descript}
              </View>
            </View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="location-o" />
              地点：
            </View>
            <View className={styles.value}>{currentLession.address}</View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="balance-o" />
              价格目录：
            </View>
            <View className={styles.value}>{currentLession.price}</View>
          </View>
          <View className={styles.labelValue}>
            <View className={styles.label}>
              <van-icon name="clock-o" />
              时间：
            </View>
            <View className={styles.value}>
              {currentLession.startTime}-{currentLession.endTime}
            </View>
          </View>
        </View>

        <View className={styles.lessionTitle}>课程介绍</View>
        <View className={styles.module}>
          <View className={styles.lessionIntro}>
            {currentLession.descriptMore}
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
