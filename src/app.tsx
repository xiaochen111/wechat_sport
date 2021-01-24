import Taro from "@tarojs/taro";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import configStore from "./store";
import "./app.scss";

const store = configStore();

// class App extends Component {
//   componentDidMount() {
//     Taro.getSetting({
//       success: (res: any) => {
//         if (!res.authSetting["scope.userInfo"]) {
//           console.log("没有授权了");
//           Taro.redirectTo({ url: "/pages/authorize/index" });
//         }
//       },
//     });
//   }

//   componentDidShow() {}

//   componentDidHide() {}

//   componentDidCatchError() {}

//   // 在 App 类中的 render() 函数没有实际作用
//   // 请勿修改此函数
//   render() {
//     return <Provider store={store}>{this.props.children}</Provider>;
//   }
// }

const App: Taro.FC = (props) => {
  useEffect(() => {
    Taro.getSetting({
      success: (res: any) => {
        if (!res.authSetting["scope.userInfo"]) {
          console.log("没有授权了");
          Taro.redirectTo({ url: "/pages/authorize/index" });
        }
      },
    });
    console.log("00");
  }, []);

  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
