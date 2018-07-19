import React, {Component} from "react";
import {NavBar, WingBlank, List, InputItem, TextareaItem, Button} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import HeaderSelector from '../../components/headerSelector/headerSelect';
import {updateUser} from "../../redux/actions";

class DashenInfo extends Component {
  state = {
    header: '',
    info: '',
    post: ''
  };
  handelChange = (name, value) => {
    this.setState({
      [name]: value
    })
  };
  setHeader = (header) => {
    this.setState({header})
  };
  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    const {header} = this.props.user;
    if (header) {
      return <Redirect to='/dashen'/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem placeholder='请输入求职岗位' onChange={val => this.handelChange("post", val)}>求职岗位</InputItem>
            <TextareaItem title='个人介绍' rows={3} onChange={val => this.handelChange("info", val)}/>
            <Button type='primary' onClick={this.save}>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo);