import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtButton, AtMessage } from "taro-ui";
import { useDispatch, useSelector } from "react-redux";
import { CombineType } from "@/reducers";
import { VenueDateType } from "@/reducers/manger/venue";
import styles from "./index.module.scss";
import { getDay } from "@/utils/commom";
import { getShopLessonList,GetShopLessionListType, getShopTralarList } from "@/actions/shop";
import { LessionStateType } from "@/reducers/manger/lession";
import { PersonTralarDateType } from "@/reducers/manger/personTralar";
import { ShopAction, ShopType } from "@/reducers/shop";


type TabItem = {
  date:string,
  week:string,
  fullDate:string
}

const tabList:TabItem[] = []
for(let i = 0; i < 5; i++){
  tabList.push(getDay(i))
}

/**课程部分 */
const Tabs: Taro.FC<{
  lessionList:LessionStateType[],
  handleDateGetLessionList:(p:string) => void,
  handleLessionDetail:(d:any) => void;
}> = ({lessionList,handleDateGetLessionList,handleLessionDetail}) => {
  const [current, setCurrent] = useState<number>(0);

  const selectData = (it:TabItem,i:number) => {
    handleDateGetLessionList(it.fullDate)
    setCurrent(i)
  }  
  const toDetail = (item:any) => {
    handleLessionDetail(item)
    Taro.navigateTo({ url: "/pages/lessionDetail/index" });
  }

  return (
    <View>
      <View className={styles.tabs}>
        {tabList.map((item: TabItem, i: number) => (
          <View
            className={styles.tabItem}
            key={i}
            onClick={() => selectData(item,i)}
          >
            <View
              className={`${styles.date} ${current === i ? styles.act : ""}`}
            >
              {item.date}
            </View>
            <View
              className={`${styles.title} ${current === i ? styles.act : ""}`}
            >
              {item.week}
            </View>
          </View>
        ))}
      </View>

      <View className={styles.listContainer}>
        {lessionList.map((item: LessionStateType) => (
          <View className={styles.item} key={item.id}>
            <View className={styles.introLeft} onClick={()=> toDetail(item)}>
              <Image src={item.mainPicUrl}/>
              <View className={styles.intro}>
                <View className={styles.lession}>{item.name}</View>
                <View className={styles.datePrice}>{item.startTime}-{item.endTime}</View>
              </View>
            </View>
            <View>
              <AtButton size="small" type="primary" onClick={()=> Taro.atMessage({message:'开发中,敬请期待'})}>
                预定
              </AtButton>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const Trainer: Taro.FC<{tarlarList:PersonTralarDateType[]}> = ({tarlarList}) => {

  return (
    <View className={styles.listContainer}>
      {tarlarList.map((item: PersonTralarDateType, i: number) => (
        <View className={styles.item} key={i}>
          <View className={styles.introLeft}>
            <Image src={item.mainPicUrl} />
            <View className={styles.intro}>
              <View className={styles.lession}>{item.coashName}</View>
              <View className={styles.datePrice}>{item.price}</View>
            </View>
          </View>
          <View>
            <AtButton size="small" type="primary" onClick={()=> Taro.atMessage({message:'开发中,敬请期待'})}>
              预定
            </AtButton>
          </View>
        </View>
      ))}
    </View>
  );
};

const ShopPage: Taro.FC = () => {
  const [currentType, setCurrentType] = useState<'lession'|'sijiao'>('lession');
  const state: CombineType = useSelector((s) => s);
  const {home,shop} = state;
  const venueDetail: VenueDateType = home.venueDetail;
  const dispatch = useDispatch();

  // useDidShow(()=>{})

  useEffect(()=>{
    initLessionData({pageNo:1,venueId:venueDetail.id,date:tabList[0].fullDate,pageSize:100})
  },[])

  /**初始化课程列表 */
  const initLessionData = (params:GetShopLessionListType) => {
    dispatch({
      thunk:getShopLessonList(params)
    })
  }

  /**初始化私教列表 */
  const initTralarData = (params:{pageNo:number,pageSize:number}) => {
    dispatch({
      thunk:getShopTralarList(params)
    })
  }

  const handleDateGetLessionList = (fullDate:string) => {
    initLessionData({pageNo:1,venueId:venueDetail.id,date:fullDate,pageSize:100})
  }

  const handleTab = (type:'lession'|'sijiao') => {
    setCurrentType(type)
    if(type === 'lession'){
      initLessionData({pageNo:1,venueId:venueDetail.id,date:tabList[0].fullDate,pageSize:100})
    }else{
      initTralarData({pageNo:1,pageSize:100})
    }
  }

  const handleLessionDetail = (detail:any) => {
    dispatch({
      type: ShopType.SET_DETAIL_LESSION,
      payload:{currentLession:detail}
    } as ShopAction)
  }

  return (
    <View>
      <AtMessage/>
      <Swiper
        className={styles.swiper}
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {venueDetail.files.map((item: any) => (
          <SwiperItem key={item.id}>
            <View className={styles.swiperItem}>
              <Image src={item.fileAllPath} style={{ width: "100%" }} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles.cantact}>
        <View>地址: {venueDetail.address}</View>
        <View>电话: {venueDetail.tel}</View>
      </View>

      <View className={styles.chioseModule}>
        <Text
          className={`${styles.chisoeOne} ${
            currentType === 'lession' ? styles.current : ""
          }`}
          onClick={() => handleTab('lession')}
        >
          课程
        </Text>
        <Text
          className={`${styles.chisoeOne} ${
            currentType === 'sijiao' ? styles.current : ""
          }`}
          onClick={() => handleTab('sijiao')}
        >
          私教
        </Text>
      </View>
      {
      currentType === 'lession' ? 
        <Tabs 
          lessionList={shop.lessionList} 
          handleDateGetLessionList={handleDateGetLessionList}
          handleLessionDetail={handleLessionDetail}/> 
        : <Trainer tarlarList={shop.tarlarList} />
      }
    </View>
  );
};

export default ShopPage;
