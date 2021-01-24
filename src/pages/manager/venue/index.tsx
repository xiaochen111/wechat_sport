import { View } from "@tarojs/components";
import Taro, { atMessage } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtInput,
  AtMessage,
  AtTextarea,
} from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, fileUplad } from "@/actions/manger/venue";
import { CombineType } from "@/reducers";
import {
  VenueAction,
  VenueColoumn,
  VenueStateType,
  VenueType,
  checkColoumns,
} from "@/reducers/manger/venue";
import dayjs from "dayjs";
import { getDictData } from "@/actions/global";
import { dictKeyName, GlobalStateType } from "@/reducers/global";
import styles from "./index.module.scss";

type NeedSet =
  | "endTime"
  | "startTime"
  | "shenshiqu"
  | "jifeileixing"
  | "gymType";
type NeedSetMap = Record<NeedSet, any>;

const areaList = {
  province_list: {
    310000: "上海市",
  },
  city_list: {
    310100: "上海市",
  },
  county_list: {
    310101: "黄浦区",
    310104: "徐汇区",
    310105: "长宁区",
    310106: "静安区",
    310107: "普陀区",
    310109: "虹口区",
    310110: "杨浦区",
    310112: "闵行区",
    310113: "宝山区",
    310114: "嘉定区",
    310115: "浦东新区",
    310116: "金山区",
    310117: "松江区",
    310118: "青浦区",
    310120: "奉贤区",
    310151: "崇明区",
  },
};

const customStyle = "background:#1a1a1a; color:#fff;";

const columns = ["分钟", "小时"];

const VenuePage: Taro.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isDatePopup, setIsDatePopup] = useState<NeedSet>("startTime");
  const [selectData, setSelectData] = useState<NeedSetMap>({} as NeedSetMap);

  const state: CombineType = useSelector((s: CombineType) => s);
  const venue: VenueStateType = state.venue;
  const loadingReducer: any = state.loadingReducer;
  const gloablData: GlobalStateType = state.global;

  const { dictData } = gloablData;
  console.log("dictData: ", dictData[dictKeyName.GYM_TYPE]);

  const dispatch = useDispatch();
  const { venueData } = venue;

  useEffect(() => {
    dispatch({
      thunk: getDictData(),
    });
  }, []);

  // 输入时赋值
  const handleChange = (value: any, coloum: VenueColoumn, type?: "upload") => {
    if (type === "upload") {
      const { fileList, operationType, index } = value;
      if (operationType === "add") {
        const currentUploadItem = fileList[fileList.length - 1];
        dispatch({
          thunk: fileUplad({ file: currentUploadItem.url }),
          name: "uploadFileLoad",
        });
      } else {
        // atImagePicker组件bug 删除时使用延时解决上传不会触发选择事件
        setTimeout(() => {
          dispatch({
            type: VenueType.DELETE_PIC,
            payload: { index },
          } as VenueAction);
        });
      }
    } else {
      dispatch({
        type: VenueType.SET_VALUE,
        payload: { coloum, value },
      } as VenueAction);
    }
  };

  const openPopup = (type: NeedSet) => {
    setShow(true);
    setIsDatePopup(type);
  };

  // 选中赋值
  const selectCurrentValue = (coloum: NeedSet, value: any) => {
    setShow(false);
    switch (coloum) {
      case "shenshiqu":
        const str: string = (value as any[]).reduce(
          (tatal: string, item: any) => `${tatal}/${item.name}`,
          ""
        );
        setSelectData({ ...selectData, [coloum]: str.substr(1) });
        [
          { coloum: "province", value: value[0].code },
          { coloum: "city", value: value[1].code },
          { coloum: "district", value: value[2].code },
        ].forEach((item) => {
          dispatch({
            type: VenueType.SET_VALUE,
            payload: item,
          } as VenueAction);
        });

        break;
      case "startTime":
      case "endTime":
        const date = dayjs(value).format("YYYY-MM-DD hh:mm");
        setSelectData({ ...selectData, [coloum]: date });
        dispatch({
          type: VenueType.SET_VALUE,
          payload: { coloum, value: date },
        } as VenueAction);
        break;
      case "jifeileixing":
        console.log(value);
        const currentValue = value.value === "分钟" ? 1 : 2;
        dispatch({
          type: VenueType.SET_VALUE,
          payload: { coloum: "chargingType", value: currentValue },
        } as VenueAction);
        break;
      case "gymType":
        dispatch({
          type: VenueType.SET_VALUE,
          payload: { coloum, value: value.value },
        } as VenueAction);
        break;
      default:
        dispatch({
          type: VenueType.SET_VALUE,
          payload: { coloum, value },
        } as VenueAction);
    }
  };

  const handleSubmit = () => {
    let isChecked: boolean = true;
    const keysList = Object.keys(checkColoumns);
    for (let index = 0; index < keysList.length; index++) {
      const key = keysList[index];
      if (!venueData[key]) {
        atMessage({ message: checkColoumns[key].errMsg });
        isChecked = false;
        break;
      }
    }

    if (isChecked) {
      venueData.files = venueData.files.map((item: any) => item.id);
      dispatch({
        thunk: addVenue(venueData),
        name: "addVenueLoading",
      });
    }
  };

  return (
    <View className={styles.formModule}>
      <AtMessage />
      <AtForm>
        <AtInput
          name="name"
          title="场馆名称"
          type="text"
          value={venueData.name}
          onChange={(value) => handleChange(value, "name")}
        />
        <AtInput
          name="shenshiqu"
          title="省市区"
          type="text"
          value={selectData.shenshiqu}
          editable={false}
          onClick={() => openPopup("shenshiqu")}
          onChange={() => {}}
        />
        <AtInput
          name="address"
          title="地址"
          value={venueData.address}
          type="text"
          onChange={(value) => handleChange(value, "address")}
        />
        <AtInput
          name="tel"
          title="电话"
          value={venueData.tel}
          type="text"
          onChange={(value) => handleChange(value, "tel")}
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
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>场地介绍</View>
          <AtTextarea
            value={venueData.describe}
            onChange={(value) => handleChange(value, "describe")}
          />
        </View>
        <AtInput
          name="gymType"
          title="场馆类型"
          value={venueData.gymType}
          editable={false}
          type="text"
          onClick={() => openPopup("gymType")}
          onChange={() => {}}
          // onChange={(value) => handleChange(value, "gymType")}
        />
        <AtInput
          name="chargingType"
          title="计费类型"
          type="text"
          editable={false}
          value={venueData.chargingType === 1 ? "分钟" : "小时"}
          onClick={() => openPopup("jifeileixing")}
          onChange={() => {}}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>上传图片</View>
          <AtImagePicker
            files={venueData.files}
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
        <AtButton
          onClick={handleSubmit}
          customStyle={{ margin: 10 }}
          type="primary"
          loading={loadingReducer.addVenueLoading}
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
        {(isDatePopup === "startTime" || isDatePopup === "endTime") && (
          <van-datetime-picker
            type="datetime"
            onconfirm={(e: any) => selectCurrentValue(isDatePopup, e.detail)}
            value={new Date().getTime()}
            oncancel={() => setShow(false)}
          />
        )}

        {isDatePopup === "shenshiqu" && (
          <van-area
            areaList={areaList}
            oncancel={() => setShow(false)}
            onconfirm={(e: any) =>
              selectCurrentValue("shenshiqu", e.detail.values)
            }
          />
        )}

        {isDatePopup === "jifeileixing" && (
          <van-picker
            columns={columns}
            showToolbar
            oncancel={() => setShow(false)}
            onconfirm={(e: any) => selectCurrentValue("jifeileixing", e.detail)}
          />
        )}

        {isDatePopup === "gymType" && (
          <van-picker
            columns={(dictData[dictKeyName.GYM_TYPE] as any[]).map(
              (item: any) => item.value
            )}
            showToolbar
            oncancel={() => setShow(false)}
            onconfirm={(e: any) => selectCurrentValue("gymType", e.detail)}
          />
        )}
      </van-popup>
    </View>
  );
};

export default VenuePage;
