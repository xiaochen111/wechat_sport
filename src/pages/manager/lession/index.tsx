import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtInput,
  AtSwitch,
  AtTextarea,
} from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { fileUplad } from "@/actions/manger/venue";
import { CombineType } from "@/reducers";
import dayjs from "dayjs";
import {
  LessionAction,
  LessionActionType,
  LessionKeys,
} from "@/reducers/manger/lession";
import styles from "./index.module.scss";
import CombineVenue from "./combineVenue";

type NeedSet = "endTime" | "startTime" | "shenshiqu";
type NeedSetMap = Record<NeedSet, any>;

const customStyle = "background:#1a1a1a; color:#fff;";

const LessionPage: Taro.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showVenue, setShowVenue] = useState<boolean>(false);
  const [isDatePopup, setIsDatePopup] = useState<NeedSet>("startTime");
  const [selectData, setSelectData] = useState<NeedSetMap>({} as NeedSetMap);

  const state: CombineType = useSelector((s) => s);
  const dispatch = useDispatch();
  const lession = state.lession;
  const managerIndex = state.managerIndex;
  const { lessionData } = lession;

  // 输入时赋值
  const handleChange = (value: any, coloum: LessionKeys, type?: "upload") => {
    if (type === "upload") {
      const { fileList, operationType, index } = value;
      if (operationType === "add") {
        const currentUploadItem = fileList[fileList.length - 1];
        dispatch({
          thunk: fileUplad({ file: currentUploadItem.url }, "list"),
          name: "uploadFileLoad",
        });
      } else {
        // atImagePicker组件bug 删除时使用延时解决上传不会触发选择事件
        setTimeout(() => {
          dispatch({
            type: LessionActionType.DELETE_PIC,
            payload: { index },
          } as LessionAction);
        });
      }
    } else {
      dispatch({
        type: LessionActionType.SET_VALUE,
        payload: { coloum, value },
      } as LessionAction);
    }
  };

  const openPopup = (type: NeedSet) => {
    // 有点击穿透的bug
    if (!showVenue) {
      setShow(true);
      setIsDatePopup(type);
    }
  };

  // 选中赋值
  const selectCurrentValue = (coloum: NeedSet, value: any) => {
    setShow(false);
    switch (coloum) {
      case "startTime":
      case "endTime":
        const date = dayjs(value).format("YYYY-MM-DD hh:mm");
        setSelectData({ ...selectData, [coloum]: date });
        dispatch({
          type: LessionActionType.SET_VALUE,
          payload: { coloum, value },
        } as LessionAction);
      default:
        dispatch({
          type: LessionActionType.SET_VALUE,
          payload: { coloum, value },
        } as LessionAction);
    }
  };

  const handleSubmit = () => {
    console.log(lessionData);
  };

  return (
    <View className={styles.formModule}>
      <AtForm>
        <AtInput
          name="startTime"
          title="关联场馆"
          type="text"
          value={selectData.startTime}
          editable={false}
          onClick={() => setShowVenue(true)}
          onChange={() => {}}
        />
        <AtInput
          name="name"
          title="课程名称"
          type="text"
          value={lessionData.name}
          onChange={(value) => handleChange(value, "name")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>课程简介</View>
          <AtTextarea
            value={lessionData.descript}
            onChange={(value) => handleChange(value, "descript")}
          />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>课程介绍</View>
          <AtTextarea
            value={lessionData.descriptMore}
            onChange={(value) => handleChange(value, "descriptMore")}
          />
        </View>
        <AtInput
          name="address"
          title="地址"
          value={lessionData.address}
          type="text"
          onChange={(value) => handleChange(value, "address")}
        />
        <AtInput
          name="startTime"
          title="开始时间"
          type="text"
          value={selectData.startTime}
          editable={false}
          onClick={() => openPopup("startTime")}
          onChange={() => {}}
        />
        <AtInput
          name="endTime"
          title="结束时间"
          type="text"
          value={selectData.endTime}
          editable={false}
          onClick={() => openPopup("endTime")}
          onChange={() => {}}
        />

        <AtInput
          name="address"
          title="地点"
          type="text"
          onChange={(value) => handleChange(value, "address")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>主图片</View>
          <AtImagePicker
            files={lessionData.mainPic}
            multiple={false}
            onChange={(fileList: any[], operationType: string, index: number) =>
              handleChange(
                { fileList, operationType, index },
                "mainPic",
                "upload"
              )
            }
          />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>上传图片</View>
          <AtImagePicker
            files={lessionData.files}
            multiple={false}
            onChange={(fileList: any[], operationType: string, index: number) =>
              handleChange(
                { fileList, operationType, index },
                "files",
                "upload"
              )
            }
          />
        </View>
        <AtSwitch title="开启" checked={lessionData.status === 1} />
        <AtButton
          onClick={handleSubmit}
          customStyle={{ margin: 10 }}
          type="primary"
        >
          提交
        </AtButton>
      </AtForm>

      {/* 弹窗 */}
      <van-popup
        show={show}
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShow(false)}
      >
        <van-datetime-picker
          type="datetime"
          onconfirm={(e: any) => selectCurrentValue(isDatePopup, e.detail)}
          value={new Date().getTime()}
          oncancel={() => setShow(false)}
        />
      </van-popup>

      {/* 关联场馆弹窗 */}
      <van-popup
        show={showVenue}
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShowVenue(false)}
      >
        <CombineVenue list={managerIndex.venueList} />
      </van-popup>
    </View>
  );
};

export default LessionPage;
