import { atMessage } from "@tarojs/taro";
import { JyObj } from "@/reducers/manger/venue";

/**
 *
 * @param checkColoumns 校验规则对象
 * @param checkData 校验数据
 */
export const checkValue = (
  checkColoumns: object,
  checkData: object
): boolean => {
  let isChecked: boolean = true;
  const keysList = Object.keys(checkColoumns);
  for (let index = 0; index < keysList.length; index++) {
    const key = keysList[index];
    const checkedObj = checkColoumns[key] as JyObj;
    // const currentValue = checkData[key] ?? false;
    //typeof currentValue === "boolean" && !currentValue
    if (
      checkData[key] === undefined ||
      checkData[key] === null ||
      checkData[key] === ""
    ) {
      atMessage({ message: checkedObj.errMsg });
      isChecked = false;
      break;
    }
    if (checkedObj.patter?.rege) {
      const res = checkedObj.patter?.rege?.test(checkData[key]);
      if (!res) {
        atMessage({ message: checkedObj.patter?.msg });
        isChecked = false;
        break;
      }
    }
    if (checkedObj.patter?.fn) {
      const res = checkedObj.patter?.fn(checkData[key]);
      if (!res) {
        atMessage({ message: checkedObj.patter?.msg });
        isChecked = false;
        break;
      }
    }
  }

  return isChecked;
};

function doHandleMonth(month) {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

/**
 * 获取日期
 * @param day 0:当天 1:明天 -1:昨天
 */
export const getDay = (day:number):{date:string,week:string,fullDate:string} => {
  const weekday = ['日','一','二','三','四','五','六']
  const today = new Date();
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  const tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  const days = today.getDay();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  // return tYear + "-" + tMonth + "-" + tDate;
  return {
    date:`${tMonth}.${tDate}`,
    week:weekday[days],
    fullDate:`${tYear}-${tMonth}-${tDate}`
  }
};
