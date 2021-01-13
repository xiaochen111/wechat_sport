import { View } from "@tarojs/components";
import React from "react";
import { AtButton, AtDivider, AtForm, AtInput } from "taro-ui";

import styles from "./index.module.scss";

const AuthorizePage: Taro.FC = () => {
  return (
    <View className={styles.container}>
      <AtForm>
        <AtDivider content="管理员登录" />
        <AtInput
          name="value"
          title="用户名"
          type="text"
          placeholder=""
          value=""
          onChange={() => {}}
        />
        <AtInput
          name="value"
          title="密码"
          type="text"
          placeholder=""
          value=""
          onChange={() => {}}
        />
        <AtButton type="primary" customStyle={{ marginTop: 40 }}>
          提交
        </AtButton>
      </AtForm>
    </View>
  );
};

export default AuthorizePage;
