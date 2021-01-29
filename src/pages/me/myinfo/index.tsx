import { Text, View } from "@tarojs/components";
import React, { useEffect } from "react";
import { AtImagePicker, AtInput } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@/actions/me";
import { CombineType } from "@/reducers";
import styles from "./index.module.scss";

const MyInfo: Taro.FC = () => {
  const dispatch = useDispatch();
  const state: CombineType = useSelector((s) => s);
  const {
    me: { myInfo },
  } = state;

  useEffect(() => {
    dispatch({
      thunk: getUserInfo(),
    });
  }, []);

  return (
    <View className={styles.infoMain}>
      <View className={styles.avatar}>
        <Text>头像</Text>
        <AtImagePicker
          files={[{ url: myInfo.img }]}
          onChange={() => {}}
          length={1}
          showAddBtn={false}
        />
      </View>
      <AtInput
        name="nickName"
        value={myInfo.nickname}
        title="昵称"
        onChange={() => {}}
      />
      <AtInput
        name="nickName"
        value={myInfo.gender}
        title="性别"
        onChange={() => {}}
      />
      <AtInput
        name="nickName"
        value={myInfo.height}
        title="身高"
        onChange={() => {}}
      />
      <AtInput
        name="nickName"
        value={myInfo.weight}
        title="体重"
        onChange={() => {}}
      />
    </View>
  );
};

export default MyInfo;
