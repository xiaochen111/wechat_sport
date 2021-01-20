import { Button, OpenData, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { asyncGetOpenIdAndSessionKey } from "@/actions/login";
import React, { useEffect, useState } from "react";
import { AtButton } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const AuthorizePage: Taro.FC = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState<any>("");
  const loadingReducer = useSelector((state) => state.loadingReducer);

  const getUserInfo = (e: any) => {
    dispatch({
      thunk: asyncGetOpenIdAndSessionKey({
        code,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
      }),
      name: "getUserLoading",
    });
  };

  useEffect(() => {
    Taro.getSetting({
      success: (res: any) => {
        if (res.authSetting["scope.userInfo"]) {
          console.log("授权了");
          const hasUserInfo = Taro.getStorageSync("userInfo");
          if (hasUserInfo) {
            Taro.switchTab({
              url: "/pages/home/index",
            });
          } else {
            Taro.login({
              success: (e: any) => {
                setCode(e.code);
              },
            });
          }
        } else {
          console.log("没有授权");
          Taro.login({
            success: (e: any) => {
              setCode(e.code);
            },
          });
        }
      },
    });
  }, []);

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Button
          type="primary"
          openType="getUserInfo"
          onGetUserInfo={getUserInfo}
          className={styles.authUserInfo}
          loading={loadingReducer.getUserLoading}
        >
          微信授权登录
        </Button>
        <AtButton type="primary" full>
          管理员登录
        </AtButton>
      </View>
    </View>
  );
};

export default AuthorizePage;
