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
  LessionOrPersonState,
  deleteCurrentPersonTralar,
  enableOrDisablePersionTralar,
} from "@/actions/manger/indexManager";
import { AtLoadMore } from "taro-ui";
import {
  LessionAction,
  LessionActionType,
  LessionStateType,
} from "@/reducers/manger/lession";
import {
  ListType,
  ManagerIndexDispatchParams,
  MangerIndexActionType,
} from "@/reducers/manger/indexManger";
import {
  PersonTarlarType,
  PersonTralarAction,
  PersonTralarDateType,
} from "@/reducers/manger/personTralar";
import { setNav, TabbarAction } from "@/reducers/tabbar";
import styles from "./index.module.scss";

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
    state: LessionOrPersonState
  ) => {
    dispatch({
      thunk: enableOrDisableLession({ id, index: i, state }),
    });
  };

  /**编辑课程 */
  const editCurrentLession = (it: LessionStateType) => {
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
                item.status === 1
                  ? LessionOrPersonState.disable
                  : LessionOrPersonState.enable
              )
            }
          >
            {item.status === 1 ? "禁用" : "激活"}
          </View>
        </Slot>
        <View
          className={styles.itemMain}
          onClick={() => editCurrentLession(item)}
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

/**私教item */
const PersonTralarItem: Taro.FC<{
  item: PersonTralarDateType;
  index: number;
}> = ({ item, index }) => {
  const dispatch = useDispatch();

  /**删除私教 */
  const handleDelete = (i: number, id: string) => {
    dispatch({
      thunk: deleteCurrentPersonTralar({ id, index: i }),
    });
  };
  // 激活 or 禁用 私教
  const handleEnableOrDisable = (
    i: number,
    id: string,
    state: LessionOrPersonState
  ) => {
    dispatch({
      thunk: enableOrDisablePersionTralar({ id, index: i, state }),
    });
  };

  /**编辑私教 */
  const editCurrenPersonTralar = (it: PersonTralarDateType) => {
    it.mainPic = [{ url: it.mainPicUrl, id: item.mainPic }];
    it.files = it.fileList.map((fileItem: any) => ({
      url: fileItem.fileAllPath,
      id: fileItem.id,
    }));
    dispatch({
      type: PersonTarlarType.EIDT_PERSON_TRALAR_INIT_DATA,
      payload: { personTralarData: it },
    } as PersonTralarAction);

    Taro.navigateTo({
      url: "/pages/manager/personTralar/index",
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
                item.status === 1
                  ? LessionOrPersonState.disable
                  : LessionOrPersonState.enable
              )
            }
          >
            {item.status === 1 ? "下线" : "上线"}
          </View>
        </Slot>
        <View
          className={styles.itemMain}
          onClick={() => editCurrenPersonTralar(item)}
        >
          <Image src={item.mainPicUrl}></Image>
          <View className={styles.rightMain}>
            <View>{item.coashTheme}</View>
            <View>{item.coashName}</View>
            <View>{item.price}</View>
            <View>{item.address}</View>
            <View>{item.coashDescript}</View>
            <View>{item.status === 1 ? "上线" : "下线"}</View>
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
    <PersonTralarItem item={item} index={index} />
  ),
};

const option = [
  { text: "场馆", value: ListType.venue },
  { text: "课程", value: ListType.lession },
  { text: "私教", value: ListType.persionTralar },
];

const SysHome: Taro.FC = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState<boolean>(false);

  const state: CombineType = useSelector((s: CombineType) => s);
  const {
    managerIndex: {
      venueList,
      lessionList,
      personTralarList,
      canloading,
      currentModule,
    },
    loadingReducer = {},
  } = state;

  const listData = [venueList, lessionList, personTralarList];

  useDidShow(() => {
    initData(currentModule!, { pageNo: 1 });
    dispatch({
      type: setNav.SET_CURRENT,
      payload: { selected: 0 },
    } as TabbarAction);
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
    dispatch({
      type: MangerIndexActionType.SET_CURRENT_MODULE,
      payload: { currentModule: e.detail },
    } as ManagerIndexDispatchParams);
    initData(e.detail, { pageNo: 1 });
    setCurrentPage(1);
    setScrollTop(!scrollTop);
  };

  const onScrollToLower = () => {
    if (canloading) {
      setCurrentPage(currentPage + 1);
      initData(currentModule!, { pageNo: currentPage + 1 });
    }
  };

  return (
    <View className={styles.sysHome}>
      <van-dropdown-menu>
        <van-dropdown-item value={0} options={option} onChange={onChange} />
      </van-dropdown-menu>

      <ScrollView
        scrollY
        scrollTop={Number(scrollTop)}
        onScrollToLower={onScrollToLower}
        style={{ height: "calc(100vh - 96rpx - 110rpx)" }}
      >
        {listData[currentModule!].map((item: any, index: number) => (
          <View key={item.id}>{renderMap[currentModule!](item, index)}</View>
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
