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
    if (!(checkData[key] ?? false)) {
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
