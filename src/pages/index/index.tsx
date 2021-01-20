import { View, Button, Text } from "@tarojs/components";
import React, { Component } from "react";
import { connect, Dispatch } from "react-redux";
import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
  loadingReducer: any;
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(
  ({ counter, loadingReducer }) => ({
    counter,
    loadingReducer,
  }),
  (dispatch: Dispatch) => ({
    add() {
      console.log("add");
      dispatch(add());
    },
    dec() {
      console.log("dec");
      dispatch(minus());
    },
    asyncAdd() {
      // console.log("---");
      // dispatch(asyncAdd(), {
      //   name: "handelThunkALoading",
      //   // takeType: "takeLatest",
      // });
      dispatch({
        thunk: asyncAdd(),
        name: "handelThunkALoading",
      });
    },
  })
)
class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // console.log("reduxloadingState查看：", this.props.loadingReducer);
    return (
      <View className="index">
        <Button className="add_btn" onClick={this.props.add}>
          +1
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button
          className="dec_btn"
          onClick={this.props.asyncAdd}
          loading={this.props.loadingReducer.handelThunkALoading}
        >
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
          <Text>
            {this.props.loadingReducer.handelThunkALoading ? "true" : "false"}
            {JSON.stringify(this.props.loadingReducer)}
          </Text>
        </View>

        <View className="loadingio-eclipse">
          <View className="ldio-rpinwye8j0b">
            <View></View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
