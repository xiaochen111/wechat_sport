import { Image, ScrollView, Text, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import React, { useState } from "react";
import { AtButton, AtLoadMore, AtTabBar } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { HomeAction, HomeStateType, homeType } from "@/reducers/home";
import { CombineType } from "@/reducers";
import { getHomeVenueList, ParamsVenueList } from "@/actions/home";
import { VenueDateType } from "@/reducers/manger/venue";
import { areaList } from "@/utils/area";
import { dictKeyName } from "@/reducers/global";
import styles from "./index.module.scss";

const customStyle = "height: 60%; background:#1a1a1a; color:#fff;";

type AreaItem = { value: string; id: string };
const areaTypeList = Object.entries(
  areaList.county_list
)?.map((item: [string, string]) => ({ value: item[1], id: item[0] }));

const BtnGroup: Taro.FC<{
  type: "area" | "type";
  data: any[];
}> = ({ data, type }) => {
  const home: HomeStateType = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { currentArea, theme } = home;

  const handleBtn = (id: string) => {
    if (type === "area") {
      dispatch({
        type: homeType.SET_CURRENT_AREA,
        payload: {
          currentArea: id,
        },
      } as HomeAction);
    } else {
      dispatch({
        type: homeType.SET_CURRENT_THEME,
        payload: {
          theme: id,
        },
      } as HomeAction);
    }
  };

  return (
    <View className={styles.btnGroup}>
      {data.map((item: AreaItem) => (
        <AtButton
          type={
            currentArea === item.id || theme === item.id
              ? "primary"
              : "secondary"
          }
          size="small"
          full
          key={item.id}
          onClick={() => handleBtn(item.id)}
        >
          {item.value}
        </AtButton>
      ))}
    </View>
  );
};

const HomePage: Taro.FC = () => {
  const state: CombineType = useSelector((s) => s);
  const dispatch = useDispatch();
  const {
    home: { venueList, currentArea, canloading, theme },
    loadingReducer = {},
    global: { dictData },
  } = state;

  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  //点击确定时 才真正的传参
  const [comformParams, setComformParams] = useState<{
    currentArea: any;
    theme: any;
  }>({ currentArea, theme });

  useDidShow(() => {
    initPage({
      pageNo: 1,
      district: comformParams.currentArea,
      gymType: comformParams.theme,
    });
  });

  const initPage = (params: ParamsVenueList) => {
    dispatch({
      thunk: getHomeVenueList(params),
      name: "listLoading",
    });
  };

  const onScrollToLower = () => {
    if (canloading) {
      setCurrentPage(currentPage + 1);
      initPage({
        pageNo: currentPage + 1,
        district: comformParams.currentArea,
        gymType: comformParams.theme,
      });
    }
  };

  const comfirmSubmit = () => {
    initPage({
      pageNo: 1,
      district: currentArea,
      gymType: theme,
    });
    setCurrentPage(1);
    setScrollTop(!scrollTop);
    setShow(false);
    setComformParams({ theme, currentArea });
  };

  const handelTabClick = (i: number) => {
    setShow(true);
    setActive(i);
  };

  const toDetail = (item: any) => {
    Taro.navigateTo({ url: "/pages/shop/index" });
    dispatch({
      type: homeType.SET_CURRENT_VENUE_VALUE,
      payload: { venueDetail: item },
    } as HomeAction);
  };

  const currentTheme =
    dictData[dictKeyName.GYM_TYPE]?.filter(
      (item: any) => item.id === comformParams.theme
    )[0] || {};
  return (
    <View className={styles.home}>
      <AtTabBar
        backgroundColor="#1a1a1a"
        color="#fff"
        tabList={[
          {
            title:
              areaList.county_list[comformParams.currentArea] || "上海全城",
            iconType: "chevron-down",
          },
          {
            title: currentTheme.value || "门店主题",
            iconType: "chevron-down",
          },
        ]}
        onClick={handelTabClick}
        current={3}
      />
      <ScrollView
        scrollY
        scrollTop={Number(scrollTop)}
        onScrollToLower={onScrollToLower}
        style={{ height: "calc(100vh - 96rpx - 110rpx)" }}
      >
        <View className={styles.scrollview}>
          {venueList.map((item: VenueDateType, index: number) => (
            <View
              className={styles.cardItem}
              key={index}
              onClick={() => toDetail(item)}
            >
              <Image
                src={item.mainPicUrl}
                style={{
                  width: "100%",
                  height: "200rpx",
                  verticalAlign: "bottom",
                }}
              />
              <View className={styles.textContainer}>
                <View>{item.name}</View>
                <View>{item.address}</View>
              </View>
            </View>
          ))}
        </View>
        <AtLoadMore
          // customStyle="background:#fff; height:40px;"
          customStyle={{background:'transparent', height:40, color:'#fff' }}
          status={
            (!canloading && "noMore") ||
            (canloading && "more") ||
            ((loadingReducer as any).listLoading && "loading")
          }
        />
      </ScrollView>
      <van-popup
        show={show}
        round
        position="bottom"
        customStyle={customStyle}
        onclose={() => setShow(false)}
      >
        <View className={styles.tab}>
          <View className={styles.tabBtn}>
            <Text
              className={active === 0 && styles.act}
              onClick={() => setActive(0)}
            >
              上海
            </Text>
            <Text
              className={active === 1 && styles.act}
              onClick={() => setActive(1)}
            >
              主题
            </Text>
          </View>
          <View>
            <AtButton type="primary" size="small" onClick={comfirmSubmit}>
              确定
            </AtButton>
          </View>
        </View>

        {active === 0 ? (
          <BtnGroup type="area" data={areaTypeList} />
        ) : (
          <BtnGroup type="type" data={dictData[dictKeyName.GYM_TYPE]} />
        )}
      </van-popup>
    </View>
  );
};

export default HomePage;
