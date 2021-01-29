import { Image, View } from "@tarojs/components";
import Taro, { atMessage } from "@tarojs/taro";
import { CombineType } from "@/reducers";
import React from "react";
import { AtButton, AtList, AtListItem, AtMessage } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const MePage: Taro.FC = () => {
  const state: CombineType = useSelector((s) => s);
  const {
    global: { userInfo },
  } = state;

  const toNextPage = (i: number) => {
    if (i === 0) {
      Taro.atMessage({ message: "努力开发中" });
      return;
    }
    Taro.navigateTo({ url: "/pages/me/myinfo/index" });
  };

  const logout = () => {
    Taro.setStorageSync("userInfo", "");
    Taro.navigateTo({ url: "/pages/authorize/index" });
  };

  return (
    <View>
      <AtMessage />
      <View className={styles.avatarMain}>
        <Image src={userInfo.headPic} className={styles.avatar} />
        <View>{userInfo.nick}</View>
      </View>
      {userInfo.isAdmin ? null : (
        <View className={styles.meau}>
          <AtList>
            <AtListItem
              title="我的订单"
              arrow="right"
              onClick={() => toNextPage(0)}
            />
            {/* <AtListItem title="联系电话" arrow="right" /> */}
            <AtListItem
              title="个人信息"
              arrow="right"
              onClick={() => toNextPage(1)}
            />
          </AtList>
        </View>
      )}

      {userInfo.isAdmin ? (
        <View className={styles.logout}>
          <AtButton type="primary" onClick={logout}>
            退出登录
          </AtButton>
        </View>
      ) : null}
    </View>
  );
};

export default MePage;
