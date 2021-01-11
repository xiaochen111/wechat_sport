import { Image, View } from "@tarojs/components";
import React, { useState } from "react";
import { AtButton } from "taro-ui";
import styles from "./index.module.scss";

/**
 * tabItem
 */
export interface TabItem {
  title: string;
  date: string;
}

interface Iprops {}

const tabList: TabItem[] = [
  {
    title: "一",
    date: "12.3",
  },
  {
    title: "二",
    date: "12.10",
  },
  {
    title: "三",
    date: "12.11",
  },
  {
    title: "四",
    date: "12.12",
  },
  {
    title: "五",
    date: "12.10",
  },
];

const Tabs: Taro.FC<Iprops> = () => {
  const [current, setCurrent] = useState<number>(0);

  return (
    <View>
      <View className={styles.tabs}>
        {tabList.map((item: TabItem, i: number) => (
          <View
            className={styles.tabItem}
            key={i}
            onClick={() => setCurrent(i)}
          >
            <View
              className={`${styles.date} ${current === i ? styles.act : ""}`}
            >
              {item.date}
            </View>
            <View
              className={`${styles.title} ${current === i ? styles.act : ""}`}
            >
              {item.title}
            </View>
          </View>
        ))}
      </View>

      <View className={styles.listContainer}>
        {new Array(8).fill("").map((item: any, i: number) => (
          <View className={styles.item} key={i}>
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
        ))}
      </View>
    </View>
  );
};

export default Tabs;
