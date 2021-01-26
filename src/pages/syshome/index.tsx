import { Image, ScrollView, Slot, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { CombineType } from "@/reducers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VenueAction, VenueDateType, VenueType } from "@/reducers/manger/venue";
import {
  deleteCurrentVenue,
  deleteCurrentLession,
  getLessonList,
  getVenueList,
  getPersonTralarList,
  enableOrDisableLession,
  LessionState,
} from "@/actions/manger/indexManager";
import { AtLoadMore } from "taro-ui";
import {
  LessionAction,
  LessionActionType,
  LessionStateType,
} from "@/reducers/manger/lession";
import styles from "./index.module.scss";

enum ListType {
  /**场馆 */
  venue,
  /**课程 */
  lession,
  /**私教 */
  persionTralar,
}

/**场馆item */
const VenueItem: Taro.FC<{ item: VenueDateType; index: number }> = ({
  item,
  index,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (i: number, id: string) => {
    dispatch({
      thunk: deleteCurrentVenue({ id, index: i }),
    });
  };

  const editCurrentVenue = (it: VenueDateType) => {
    it.mainPic = [{ url: it.mainPicUrl, id: item.mainPic }];
    it.files = it.files.map((fileItem: any) => ({
      url: fileItem.fileAllPath,
      id: fileItem.id,
    }));
    dispatch({
      type: VenueType.EIDT_INIT_DATA,
      payload: { venueData: it },
    } as VenueAction);
    Taro.navigateTo({
      url: "/pages/manager/venue/index",
    });
  };

  return (
    <View className={styles.listItem}>
      <van-swipe-cell rightWidth={65}>
        <View
          className={styles.itemMain}
          onClick={() => editCurrentVenue(item)}
        >
          <Image src={item.mainPicUrl}></Image>
          <View className={styles.rightMain}>
            <View>{item.name}</View>
            <View>{item.address}</View>
            <View>{item.startTime}</View>
            <View>{item.endTime}</View>
            <View>{item.gymType}</View>
            <View>{item.tel}</View>
          </View>
        </View>
        <Slot name="right">
          <View onClick={() => handleDelete(index, item.id)}>删除</View>
        </Slot>
      </van-swipe-cell>
    </View>
  );
};

/**课程item */
const LessionItem: Taro.FC<{ item: LessionStateType; index: number }> = ({
  item,
  index,
}) => {
  const dispatch = useDispatch();

  /**删除课程 */
  const handleDelete = (i: number, id: string) => {
    dispatch({
      thunk: deleteCurrentLession({ id, index: i }),
    });
  };
  // 激活 or 禁用
  const handleEnableOrDisable = (
    i: number,
    id: string,
    state: LessionState
  ) => {
    dispatch({
      thunk: enableOrDisableLession({ id, index: i, state }),
    });
  };

  /**编辑课程 */
  const editCurrentVenue = (it: LessionStateType) => {
    it.mainPic = [{ url: it.mainPicUrl, id: item.mainPic }];
    it.files = it.files.map((fileItem: any) => ({
      url: fileItem.fileAllPath,
      id: fileItem.id,
    }));
    dispatch({
      type: LessionActionType.EIDT_LESSION_INIT_DATA,
      payload: { lessionData: it },
    } as LessionAction);

    Taro.navigateTo({
      url: "/pages/manager/lession/index",
    });
  };

  return (
    <View className={styles.listItem}>
      <van-swipe-cell rightWidth={65} leftWidth={65}>
        <Slot name="left">
          <View
            onClick={() =>
              handleEnableOrDisable(
                index,
                item.id,
                item.status === 1 ? LessionState.disable : LessionState.enable
              )
            }
          >
            {item.status === 1 ? "禁用" : "激活"}
          </View>
        </Slot>
        <View
          className={styles.itemMain}
          onClick={() => editCurrentVenue(item)}
        >
          <Image src={item.mainPicUrl}></Image>
          <View className={styles.rightMain}>
            <View>{item.name}</View>
            <View>{item.address}</View>
            <View>{item.startTime}</View>
            <View>{item.endTime}</View>
            <View>{item.descript}</View>
            <View>{item.status === 1 ? "激活" : "禁用"}</View>
          </View>
        </View>
        <Slot name="right">
          <View onClick={() => handleDelete(index, item.id)}>删除</View>
        </Slot>
      </van-swipe-cell>
    </View>
  );
};

const renderMap: { [key: string]: (p: any, i: number) => React.ReactNode } = {
  [ListType.venue]: (item: any, index: number) => (
    <VenueItem item={item} index={index} />
  ),
  [ListType.lession]: (item: any, index: number) => (
    <LessionItem item={item} index={index} />
  ),
  [ListType.persionTralar]: (item: any, index: number) => (
    <VenueItem item={item} index={index} />
  ),
};

const option = [
  { text: "场馆", value: ListType.venue },
  { text: "课程", value: ListType.lession },
  { text: "私教", value: ListType.persionTralar },
];

const SysHome: Taro.FC = () => {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState<ListType>(ListType.venue);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState<number>(1);

  const state: CombineType = useSelector((s: CombineType) => s);
  const {
    managerIndex: { venueList, lessionList, personTralarList, canloading },
    loadingReducer = {},
  } = state;

  const listData = [venueList, lessionList, personTralarList];

  useDidShow(() => {
    initData(ListType.venue, { pageNo: 1 });
  });

  const initData = async (type: ListType, params: { pageNo: number }) => {
    const getDataMap: { [key: string]: any } = {
      [ListType.lession]: getLessonList(params), //查询课程列表
      [ListType.venue]: getVenueList(params), //查询场馆列表
      [ListType.persionTralar]: getPersonTralarList(params), //查询私教列表
    };
    dispatch({
      thunk: getDataMap[type],
      name: "listLoading",
    });
  };

  const onChange = (e: any) => {
    setCurrentType(e.detail);
    initData(e.detail, { pageNo: 1 });
    setCurrentPage(1);
    setScrollTop(0);
  };

  const onScrollToLower = () => {
    if (canloading) {
      setCurrentPage(currentPage + 1);
      initData(currentType, { pageNo: currentPage + 1 });
    }
  };

  return (
    <View className={styles.sysHome}>
      <van-dropdown-menu>
        <van-dropdown-item value={0} options={option} onChange={onChange} />
      </van-dropdown-menu>

      <ScrollView
        scrollY
        scrollTop={scrollTop}
        onScrollToLower={onScrollToLower}
        style={{ height: "calc(100vh - 96rpx - 110rpx)" }}
      >
        {listData[currentType].map((item: any, index: number) => (
          <View key={item.id}>{renderMap[currentType](item, index)}</View>
        ))}

        <AtLoadMore
          customStyle="background:#fff; height:40px;"
          status={
            (!canloading && "noMore") ||
            (canloading && "more") ||
            ((loadingReducer as any).listLoading && "loading")
          }
        />
      </ScrollView>
    </View>
  );
};

export default SysHome;
