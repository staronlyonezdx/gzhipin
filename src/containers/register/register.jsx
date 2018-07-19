import React, {Component} from "react";
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem, Radio} from "antd-mobile";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Logo from "../../components/logo/logo";
import {register} from "../../redux/actions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "laoban"
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  };
  register = () => {
    // console.log(this.state);
    this.props.register(this.state);
  };
  toLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const {type} = this.state;
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <p className="error-msg">{msg}</p>
            <WhiteSpace/>
            <InputItem placeholder="请输入用户名" onChange={val => this.handleChange("username", val)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入密码" type="password"
                       onChange={val => this.handleChange("password", val)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入确认密码" type="password"
                       onChange={val => this.handleChange("password2", val)}>确认密码</InputItem>
            <WhiteSpace/>
            <List.Item>
              <span>用户类型:</span>&nbsp;&nbsp;
              <Radio checked={type === "laoban"}
                     onChange={() => this.handleChange("type", "laoban")}>老板</Radio>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === "dashen"} onChange={() => this.handleChange("type", "dashen")}>大神</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register);