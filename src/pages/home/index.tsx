import { Image, ScrollView, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { AtButton, AtTabBar } from "taro-ui";
import { useDispatch, useSelector, connect } from "react-redux";
import { Dispatch } from "redux";
import { HomeAction, HomeStateType, homeType } from "@/reducers/home";
import styles from "./index.module.scss";

const customStyle = "height: 60%; background:#1a1a1a; color:#fff;";

type AreaItem = { name: string; id: number };
const areaList: AreaItem[] = [
  {
    name: "浦东新区",
    id: 0,
  },
  {
    name: "杨浦",
    id: 1,
  },
  {
    name: "静安",
    id: 2,
  },
  {
    name: "嘉定",
    id: 3,
  },
];

const BtnGroup: Taro.FC<{
  type: "area" | "type";
  data: any[];
}> = ({ data, type }) => {
  const home: HomeStateType = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { currentArea } = home;

  const handleBtn = (id: number) => {
    if (type === "area") {
      dispatch({
        type: homeType.SET_CURRENT_AREA,
        payload: {
          currentArea: id,
        },
      } as HomeAction);
    }
  };

  return (
    <View className={styles.btnGroup}>
      {data.map((item: AreaItem) => (
        <AtButton
          type={currentArea === item.id ? "primary" : "secondary"}
          size="small"
          full
          key={item.id}
          onClick={() => handleBtn(item.id)}
        >
          {item.name}
        </AtButton>
      ))}
    </View>
  );
};

const HomePage: Taro.FC<{
  home: HomeStateType;
  dispatch: Dispatch<any>;
}> = ({ home, dispatch }) => {
  const { list, currentArea } = home;

  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  return (
    <View className={styles.home}>
      <AtTabBar
        backgroundColor="#1a1a1a"
        color="#fff"
        tabList={[
          { title: "上海全城", iconType: "chevron-down" },
          { title: "门店主题", iconType: "chevron-down" },
        ]}
        onClick={() => setShow(true)}
        current={3}
      />
      <ScrollView scrollY style={{ height: "calc(100vh - 96rpx - 110rpx)" }}>
        <View className={styles.scrollview}>
          {list.map((item: any, index: number) => (
            <View
              className={styles.cardItem}
              key={index}
              // onClick={() => dispatch({ type: "ADD" } as AnyAction)}
              onClick={() => dispatch({ type: homeType.SET_LIST })}
              // onClick={() => Taro.navigateTo({ url: "/pages/shop/index" })}
            >
              <Image
                src={require("@/images/jianshen.jpg")}
                style={{
                  width: "100%",
                  height: "200rpx",
                  verticalAlign: "bottom",
                }}
              />
              <View className={styles.textContainer}>
                <View>上海东昌路店</View>
                <View>上海世纪大道1200号</View>
              </View>
            </View>
          ))}
        </View>
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
            <AtButton type="primary" size="small">
              确定
            </AtButton>
          </View>
        </View>

        {active === 0 ? (
          <BtnGroup type="area" data={areaList} />
        ) : (
          <View>oop</View>
        )}
      </van-popup>
    </View>
  );
};

export default connect(
  ({ home }: any) => ({ home }),
  (dispatch: Dispatch) => ({ dispatch })
)(HomePage);
// export default HomePage;
