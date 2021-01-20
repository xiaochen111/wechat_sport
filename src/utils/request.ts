import Taro from "@tarojs/taro";

const baseUrl = "http://192.168.3.32:8082";

/**
 *
 * @param url 接口路径
 * @param data 接口参数
 */
export const request = async (url: string, data?: object) => {
  const userInfo: { tokenKey: string; token: string } = Taro.getStorageSync(
    "userInfo"
  );
  const header = userInfo ? { [userInfo.tokenKey]: userInfo.token } : {};
  const res = await Taro.request({
    url: baseUrl + url,
    data,
    method: "POST",
    header,
    // timeout: 10000,
  });

  return res.data;
};
