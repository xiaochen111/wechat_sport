import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtButton, AtInput } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "@/actions/me";
import { CombineType } from "@/reducers";
import { MeAction, MeType, MyInfo } from "@/reducers/me";
import { fileUploadRequest } from "@/utils/request";
import styles from "./index.module.scss";

const customStyle = "background:#1a1a1a; color:#fff;";
const columns = ["男", "女"];

const MyInfoPage: Taro.FC = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const state: CombineType = useSelector((s) => s);
  const {
    me: { myInfo },
  } = state;

  useEffect(() => {
    dispatch({
      thunk: getUserInfo(),
    });
  }, []);

  const handleComfire = (e: any) => {
    setShow(false);
    changeValue("gender", e.detail.value === "男" ? "1" : "2");
  };

  const changeValue = (column: keyof MyInfo, value: any) => {
    dispatch({
      type: MeType.CHANGE_USER_INFO,
      payload: { column, value },
    } as MeAction);
  };

  const handleSubmit = () => {
    dispatch({
      thunk: updateUserInfo(myInfo),
    });
  };

  const changeAvatar = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: async (res: any) => {
        const tempFilePath = res.tempFilePaths[0];
        const response = await fileUploadRequest("/gym/base/uploadFile.do", {
          file: tempFilePath,
        });
        const {
          success,
          result: { fileAllPath },
        } = response;
        if (success) {
          changeValue("img", fileAllPath);
        }
      },
    });
  };

  return (
    <View className={styles.infoMain}>
      <View className={styles.avatar}>
        <Text>头像</Text>
        <Image src={myInfo.img} className={styles.img} onClick={changeAvatar} />
      </View>
      <AtInput
        name="nickName"
        value={myInfo.nickname}
        title="昵称"
        onChange={(value) => changeValue("nickname", value)}
      />
      <AtInput
        name="gender"
        value={myInfo.gender === "1" ? "男" : "女"}
        title="性别"
        editable={false}
        onChange={() => {}}
        onClick={() => setShow(true)}
      />
      <AtInput
        name="height"
        value={myInfo.height}
        type="number"
        title="身高"
        onChange={(value) => changeValue("height", value)}
      >
        CM
      </AtInput>
      <AtInput
        name="weight"
        value={myInfo.weight}
        title="体重"
        type="number"
        onChange={(value) => changeValue("weight", value)}
      >
        KG
      </AtInput>

      <AtButton className={styles.btn} type="primary" onClick={handleSubmit}>
        保存
      </AtButton>

      {/* 弹窗 */}
      <van-popup
        show={show}
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShow(false)}
      >
        <van-picker
          columns={columns}
          showToolbar
          oncancel={() => setShow(false)}
          onconfirm={(e: any) => handleComfire(e)}
        />
      </van-popup>
    </View>
  );
};

export default MyInfoPage;
