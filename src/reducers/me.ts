/**个人用户信息 */
interface MyInfo {
  /**用户名(不能修改) */
  userName: string;
  /**头像 */
  img: string;
  /**手机号(通过小程序获取 能随便修改) */
  phone: string;
  /**昵称 */
  nickname: string;
  /**身高 */
  height: string;
  /**体重 */
  weight: string;
  /**1-男 2-女 */
  gender: string;
}

export interface MeStateType {
  myInfo: MyInfo;
}

export enum MeType {
  /**设置我的信息 */
  SET_MYINFO = "SET_MYINFO",
}

export interface MeAction {
  type: MeType;
  payload?: Partial<MeStateType>;
}

const initialState: MeStateType = {
  myInfo: {} as MyInfo,
};

export default function me(
  state: MeStateType = initialState,
  action: MeAction
) {
  const { payload, type } = action;
  switch (type) {
    case MeType.SET_MYINFO:
      return {
        ...state,
        myInfo: payload!.myInfo!,
      };
    default:
      return state;
  }
}
