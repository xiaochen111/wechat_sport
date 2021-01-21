import { View } from "@tarojs/components";
import React, { useRef } from "react";
import { AtButton, AtDivider, AtForm, AtInput } from "taro-ui";
import styles from "./index.module.scss";

type UserColoumn = "username" | "password";
type UserInfo = Record<UserColoumn, string>;

const AuthorizePage: Taro.FC = () => {
  const paramRef = useRef<UserInfo>({} as UserInfo);

  const setValues = (coloum: UserColoumn, value: string) => {
    paramRef.current[coloum] = value;
  };

  const handleSubmit = () => {
    console.log(paramRef.current);
  };

  return (
    <View className={styles.container}>
      <AtForm>
        <AtDivider content="管理员登录" />
        <AtInput
          name="username"
          title="用户名"
          type="text"
          placeholder="请输入"
          onChange={(value: any) => setValues("username", value)}
        />
        <AtInput
          name="password"
          title="密码"
          type="password"
          placeholder="请输入"
          onChange={(value: any) => setValues("password", value)}
        />
        <AtButton
          type="primary"
          customStyle={{ marginTop: 40 }}
          onClick={handleSubmit}
        >
          提交
        </AtButton>
      </AtForm>
    </View>
  );
};

export default AuthorizePage;
