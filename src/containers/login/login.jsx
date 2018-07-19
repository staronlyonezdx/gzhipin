import React, {Component} from "react";
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


import Logo from "../../components/logo/logo";
import {login} from "../../redux/actions";

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
    this.props.login(this.state);
  };
  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
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
            <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login);