import { View } from "@tarojs/components";
import React from "react";
import { AtButton } from "taro-ui";

import styles from "./index.module.scss";

const AuthorizePage: Taro.FC = () => {
  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <AtButton type="primary" full>
          微信授权登录
        </AtButton>
        <AtButton type="primary" full>
          管理员登录
        </AtButton>
      </View>
    </View>
  );
};

export default AuthorizePage;
