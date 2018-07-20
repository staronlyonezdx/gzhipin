import React, {Component} from "react";
import {Button} from "antd-mobile";


class NotFound extends Component {
  render() {
    return (
      <div>
        <p>您找到页面不存在</p>
        <Button type='primary' onClick={() => this.props.history.replace('/login')}>点击跳转到登陆页面</Button>
      </div>
    )
  }
}

export default NotFound;