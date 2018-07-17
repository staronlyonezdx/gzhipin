import React, {Component} from "react";
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem} from "antd-mobile";

import Logo from "../../components/logo/logo"

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  };
  login = () => {
    console.log(this.state);
  };
  toRegister = () => {
    this.props.history.replace("/register");
  };
  render() {
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem placeholder="请输入用户名" onChange={val => this.handleChange("username", val)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入密码" type="password"
                       onChange={val => this.handleChange("password", val)}>密码</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Login;