import { Image, ScrollView, Text, View } from "@tarojs/components";
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { AtButton, AtTabBar } from "taro-ui";
import styles from "./index.module.scss";

const customStyle = "height: 60%; background:#1a1a1a; color:#fff;";

const BtnGroup: Taro.FC<{ type: "area" | "type"; data: any[] }> = () => {
  return (
    <View className={styles.btnGroup}>
      <AtButton type="secondary" size="small" full>
        浦东新区
      </AtButton>
      <AtButton type="secondary" size="small" full>
        杨浦
      </AtButton>
      <AtButton type="secondary" size="small" full>
        静安
      </AtButton>
      <AtButton type="primary" size="small" full>
        嘉定
      </AtButton>
    </View>
  );
};

const HomePage: Taro.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  return (
    <View className={styles.home}>
      <AtTabBar
        backgroundColor="#1a1a1a"
        color="#fff"
        tabList={[
          { title: "上海全城", iconType: "chevron-down" },
          { title: "门店主题", iconType: "chevron-down" },
        ]}
        onClick={() => setShow(true)}
        current={3}
      />
      <ScrollView scrollY style={{ height: "calc(100vh - 96rpx)" }}>
        <View className={styles.scrollview}>
          {new Array(8).fill("").map((item: any, index: number) => (
            <View
              className={styles.cardItem}
              key={index}
              onClick={() => Taro.navigateTo({ url: "/pages/shop/index" })}
            >
              <Image
                src={require("@/images/jianshen.jpg")}
                style={{
                  width: "100%",
                  height: "200rpx",
                  verticalAlign: "bottom",
                }}
              />
              <View className={styles.textContainer}>
                <View>上海东昌路店</View>
                <View>上海世纪大道1200号</View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <van-popup
        show={show}
        round
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShow(false)}
      >
        <View className={styles.tab}>
          <View className={styles.tabBtn}>
            <Text
              className={active === 0 && styles.act}
              onClick={() => setActive(0)}
            >
              上海
            </Text>
            <Text
              className={active === 1 && styles.act}
              onClick={() => setActive(1)}
            >
              主题
            </Text>
          </View>
          <View>
            <AtButton type="primary" size="small">
              确定
            </AtButton>
          </View>
        </View>

        {active === 0 ? <BtnGroup type="area" data={[]} /> : <View>oop</View>}
      </van-popup>
    </View>
  );
};

// Taro.setNavigationBarTitle({
//   title: "SUPERMONKEY",
// });

// Taro.setNavigationBarColor({
//   frontColor: "#ffffff",
//   backgroundColor: "#1a1a1a",
//   animation: {
//     duration: 400,
//     timingFunc: "easeIn",
//   },
// });

export default HomePage;
