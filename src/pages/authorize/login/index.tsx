import { View } from "@tarojs/components";
import { doLogin } from "@/actions/login";
import React, { useRef } from "react";
import { AtButton, AtDivider, AtForm, AtInput } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { CombineType } from "@/reducers";
import styles from "./index.module.scss";

type UserColoumn = "userName" | "password";
export type UserInfo = Record<UserColoumn, string>;

const AuthorizePage: Taro.FC = () => {
  const paramRef = useRef<UserInfo>({} as UserInfo);
  const dispatch = useDispatch();
  const loadingReducer = useSelector(
    (state: CombineType) => state.loadingReducer
  );

  const setValues = (coloum: UserColoumn, value: string) => {
    paramRef.current[coloum] = value;
  };

  const handleSubmit = () => {
    console.log(paramRef.current);
    dispatch({
      thunk: doLogin(paramRef.current),
      name: "loading",
    });
  };

  return (
    <View className={styles.container}>
      <AtForm>
        <AtDivider content="管理员登录" />
        <AtInput
          name="userName"
          title="用户名"
          type="text"
          value={paramRef.current.userName}
          placeholder="请输入"
          onChange={(value: any) => setValues("userName", value)}
        />
        <AtInput
          name="password"
          title="密码"
          type="password"
          placeholder="请输入"
          value={paramRef.current.password}
          onChange={(value: any) => setValues("password", value)}
        />
        <AtButton
          type="primary"
          customStyle={{ marginTop: 40 }}
          onClick={handleSubmit}
          loading={loadingReducer.loading}
        >
          提交
        </AtButton>
      </AtForm>
    </View>
  );
};

export default AuthorizePage;
