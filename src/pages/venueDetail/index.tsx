import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { useSelector } from "react-redux";
import { AtButton } from "taro-ui";
import { CombineType } from "@/reducers";
import { VenueDateType } from "@/reducers/manger/venue";
import styles from "./index.module.scss";

const VenuePage: Taro.FC = () => {
  const state: CombineType = useSelector((s) => s);
  const { home } = state;
  const venueDetail: VenueDateType = home.venueDetail;

  const toDetail = (type: "lession" | "sijiao") => {
    Taro.navigateTo({
      url: `/pages/shop/index?type=${type}`,
    });
  };

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
        {venueDetail.files.map((item: any) => (
          <SwiperItem key={item.id}>
            <View className={styles.swiperItem}>
              <Image src={item.fileAllPath} style={{ width: "100%" }} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles.cantact}>
        <View>地址: {venueDetail.address}</View>
        <View>电话: {venueDetail.tel}</View>
      </View>

      <View className={styles.listContainer}>
        <View className={styles.item}>
          <View className={styles.introLeft}>
            <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
            <View className={styles.intro}>
              <View className={styles.lession}>私教</View>
            </View>
          </View>
          <View>
            <AtButton
              size="small"
              type="primary"
              onClick={() => toDetail("sijiao")}
            >
              查看
            </AtButton>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles.introLeft}>
            <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" />
            <View className={styles.intro}>
              <View className={styles.lession}>课程</View>
            </View>
          </View>
          <View>
            <AtButton
              size="small"
              type="primary"
              onClick={() => toDetail("lession")}
            >
              查看
            </AtButton>
          </View>
        </View>

        <View className={styles.lessionTitle}>场地介绍</View>
        <View className={styles.module}>
          <View className={styles.lessionIntro}>{venueDetail.description}</View>
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
