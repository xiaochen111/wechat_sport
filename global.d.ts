declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace JSX {
  interface IntrinsicElements {
    "van-button": any;
    "van-calendar": any;
    "van-datetime-picker": any;
    "van-popup": any;
    "van-icon": any;
    "van-area": any;
    "van-swipe-cell": any;
    "van-dropdown-menu": any;
    "van-dropdown-item": any;
    "van-picker": any;
    "van-search": any;
    "van-empty": any;
  }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | "weapp"
      | "swan"
      | "alipay"
      | "h5"
      | "rn"
      | "tt"
      | "quickapp"
      | "qq"
      | "jd";
    [key: string]: any;
  };
};

// "dev:weapp": "NODE_ENV=production taro build --type weapp --watch",
// "dev:weapp": "npm run build:weapp -- --watch",
