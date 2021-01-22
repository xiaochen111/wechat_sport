import Taro from "@tarojs/taro";

const baseUrl = "http://192.168.3.41:8082";

interface ResopnseType {
  /**返回信息 */
  msg: string;
  /**返回状态码 */
  code: number;
  /**返回是否成功 */
  success: boolean;
  /**返回对象 */
  result: any;
}

/**
 *
 * @param url 接口路径
 * @param data 接口参数
 */
export const request = async (
  url: string,
  data?: object
): Promise<ResopnseType> => {
  const userInfo: { tokenKey: string; token: string } = Taro.getStorageSync(
    "userInfo"
  );
  const header = userInfo ? { [userInfo.tokenKey]: userInfo.token } : {};

  try {
    const res = await Taro.request({
      url: baseUrl + url,
      data,
      method: "POST",
      header,
      // timeout: 10000,
    });
    const { data: response } = res;
    if (!response.success) {
      Taro.showToast({
        title: response.msg || "接口返回错误",
        icon: "none",
      });
    }

    return response;
  } catch (error) {
    // console.log("error: ", error);
    Taro.showToast({
      title: JSON.stringify(error),
      icon: "none",
    });
    return {} as ResopnseType;
  }
};

// http://yapi.ngroo.cn/ yapi地址 密码111111
