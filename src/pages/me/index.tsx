import { Text, View } from "@tarojs/components";
import React from "react";
import { AtButton, AtList, AtListItem } from "taro-ui";

import styles from "./index.module.scss";

const MePage: Taro.FC = () => {
  return (
    <View>
      <View className={styles.avatar}>
        <Text>头像</Text>
        <Text>昵称</Text>
      </View>
      <View className={styles.meau}>
        <AtList>
          <AtListItem title="我的订单" arrow="right" />
          <AtListItem title="联系电话" arrow="right" />
          <AtListItem title="个人信息" arrow="right" />
        </AtList>

        <View className={styles.logout}>
          <AtButton type="primary">退出登录</AtButton>
        </View>
      </View>
    </View>
  );
};

export default MePage;