export interface LoginStateType {
  openIdAndSessionKey: any;
}

export enum LoginType {
  GET_OPENID_SESSION_KEY = "GET_OPENID_SESSION_KEY",
}

export interface LoginAction {
  type: LoginType;
  payload?: Partial<LoginStateType>;
}

const initialState: LoginStateType = {
  openIdAndSessionKey: {},
};

export default function login(state = initialState, action: LoginAction) {
  const { payload, type } = action;
  switch (type) {
    case LoginType.GET_OPENID_SESSION_KEY:
      return {
        ...state,
        openIdAndSessionKey: payload!.openIdAndSessionKey,
      };
    default:
      return state;
  }
}
