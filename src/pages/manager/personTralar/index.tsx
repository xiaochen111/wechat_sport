import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtInput,
  AtMessage,
  AtSwitch,
  AtTextarea,
} from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { CombineType } from "@/reducers";
// import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { checkValue } from "@/utils/commom";
import {
  checkPersonTralarColoumns,
  PersonTarlarType,
  PersonTralarAction,
  PersonTralarColoumn,
  PersonTralarStateType,
} from "@/reducers/manger/personTralar";
import {
  addPersonTralar,
  eidtPersonTralar,
  personTralarFileUplad,
} from "@/actions/manger/personTralar";
import { getVenueList } from "@/actions/manger/indexManager";
import CombineVenue from "../lession/combineVenue";
import styles from "./index.module.scss";

type NeedSet = "endTime" | "startTime" | "venuiName";

type NeedSetMap = Record<NeedSet, any>;

const customStyle = "background:#1a1a1a; color:#fff;";

const VenuePage: Taro.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isDatePopup, setIsDatePopup] = useState<NeedSet>("startTime");
  const [selectData, setSelectData] = useState<NeedSetMap>({} as NeedSetMap);
  const [showVenue, setShowVenue] = useState<boolean>(false);

  const state: CombineType = useSelector((s: CombineType) => s);
  const personTralar: PersonTralarStateType = state.personTralar;
  const loadingReducer: any = state.loadingReducer;
  const managerIndex = state.managerIndex;

  const dispatch = useDispatch();
  const { personTralarData, isEidt } = personTralar;
  console.log("personTralarData: ", personTralarData);

  useEffect(() => {
    if (isEidt) {
      setSelectData({
        endTime: personTralarData.endTime,
        startTime: personTralarData.startTime,
        venuiName: personTralarData.venueName,
      });
    }
  }, [isEidt]);

  // 输入时赋值
  const handleChange = (
    value: any,
    coloum: PersonTralarColoumn,
    type?: "upload"
  ) => {
    if (type === "upload") {
      const { fileList, operationType, index } = value;
      if (operationType === "add") {
        const currentUploadItem = fileList[fileList.length - 1];
        dispatch({
          thunk: personTralarFileUplad(
            { file: currentUploadItem.url },
            coloum === "files" ? "list" : "main"
          ),
          name: "imgUploading",
        });
      } else {
        // atImagePicker组件bug 删除时使用延时解决上传不会触发选择事件
        setTimeout(() => {
          if (coloum === "files") {
            dispatch({
              type: PersonTarlarType.DELETE_PERSON_TRALAR_PIC,
              payload: { index },
            } as PersonTralarAction);
          }
          if (coloum === "mainPic") {
            dispatch({
              type: PersonTarlarType.DELETE_PERSON_TRALAR_MAIN_PIC,
            });
          }
        });
      }
    } else {
      dispatch({
        type: PersonTarlarType.SET_PERSON_TRALAR_VALUE,
        payload: { coloum, value },
      } as PersonTralarAction);
    }
  };

  const openPopup = (type: NeedSet) => {
    // 点击弹窗穿透bug
    if (!show) {
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
        console.log(value);
        setSelectData({ ...selectData, [coloum]: value });
        dispatch({
          type: PersonTarlarType.SET_PERSON_TRALAR_VALUE,
          payload: { coloum, value },
        } as PersonTralarAction);
        break;
      default:
        dispatch({
          type: PersonTarlarType.SET_PERSON_TRALAR_VALUE,
          payload: { coloum, value },
        });
    }
  };

  const handleSubmit = () => {
    const isChecked = checkValue(checkPersonTralarColoumns, personTralarData);

    if (isChecked) {
      const cloneData = cloneDeep(personTralarData);
      cloneData.files = cloneData.files.map((item: any) => item.id);
      cloneData.mainPic = cloneData.mainPic[0].id;
      dispatch({
        thunk: isEidt
          ? eidtPersonTralar(cloneData)
          : addPersonTralar(cloneData),
        name: "addVenueLoading",
      });
    }
  };

  const handleItem = (item: any) => {
    setSelectData({ ...selectData, venuiName: item.name });
    handleChange(item.id, "venueId");
    setShowVenue(false);
  };

  const handleSearch = (name: string) => {
    dispatch({
      thunk: getVenueList({ pageNo: 1, name }),
    });
  };

  const openVenueList = () => {
    setShowVenue(true);
    dispatch({
      thunk: getVenueList({ pageNo: 1 }),
    });
  };

  return (
    <View className={styles.formModule}>
      <AtMessage />
      <AtForm customStyle="zIndex:0">
        <AtInput
          name="venuiName"
          title="关联场馆"
          type="text"
          value={selectData.venuiName}
          editable={false}
          onClick={openVenueList}
          onChange={() => {}}
        />
        <AtInput
          name="coashName"
          title="私教名称"
          type="text"
          value={personTralarData.coashName}
          onChange={(value) => handleChange(value, "coashName")}
        />
        <AtInput
          name="coashTheme"
          title="私教主题"
          value={personTralarData.coashTheme}
          type="text"
          onChange={(value) => handleChange(value, "coashTheme")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>私教介绍</View>
          <AtTextarea
            value={personTralarData.coashDescript}
            onChange={(value) => handleChange(value, "coashDescript")}
          />
        </View>
        <AtInput
          name="price"
          title="显示价"
          value={personTralarData.price}
          type="text"
          onChange={(value) => handleChange(value, "price")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>收费目录</View>
          <AtTextarea
            value={personTralarData.priceDirectory}
            onChange={(value) => handleChange(value, "priceDirectory")}
          />
        </View>
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
          value={personTralarData.address}
          type="text"
          onChange={(value) => handleChange(value, "address")}
        />
        <View style={{ padding: 10 }}>
          <View style={{ lineHeight: 2, paddingLeft: 5 }}>主图片</View>
          <AtImagePicker
            files={personTralarData.mainPic}
            showAddBtn={!(personTralarData.mainPic?.length === 1)}
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
            files={personTralarData.files}
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
        <AtSwitch
          title="上线"
          checked={personTralarData.status === 1}
          onChange={(b: boolean) => handleChange(Number(b), "status")}
        />
        <AtButton
          onClick={handleSubmit}
          customStyle={{ margin: 10 }}
          type="primary"
          loading={loadingReducer.addVenueLoading}
        >
          {isEidt ? "修改" : "提交"}
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
            type="time"
            minHour={0}
            maxHour={23}
            onconfirm={(e: any) => selectCurrentValue(isDatePopup, e.detail)}
            value="12:00"
            oncancel={() => setShow(false)}
          />
        )}
      </van-popup>

      {/* 关联场馆弹窗 */}
      <van-popup
        show={showVenue}
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShowVenue(false)}
      >
        <CombineVenue
          list={managerIndex.venueList}
          handleItem={handleItem}
          handleSearch={handleSearch}
        />
      </van-popup>
    </View>
  );
};

export default VenuePage;
