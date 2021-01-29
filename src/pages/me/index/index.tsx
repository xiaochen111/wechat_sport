import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { CombineType } from "@/reducers";
import React from "react";
import { AtButton, AtList, AtListItem } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const MePage: Taro.FC = () => {
  const state: CombineType = useSelector((s) => s);
  const {
    global: { userInfo },
  } = state;

  return (
    <View>
      <View className={styles.avatarMain}>
        <Image src={userInfo.headPic} className={styles.avatar} />
        <View>{userInfo.nick}</View>
      </View>
      <View className={styles.meau}>
        <AtList>
          <AtListItem title="我的订单" arrow="right" />
          {/* <AtListItem title="联系电话" arrow="right" /> */}
          <AtListItem title="个人信息" arrow="right" />
        </AtList>

        {userInfo.isAdmin ? (
          <View className={styles.logout}>
            <AtButton type="primary">退出登录</AtButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MePage;
