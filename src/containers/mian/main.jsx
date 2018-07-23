import React, {Component} from "react";
import {NavBar} from "antd-mobile";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from "js-cookie";

import DashenInfo from "../dashen-info/dashen-info";
import LaobanInfo from "../laoban-info/laoban-info";
import Laoban from "../laoban/laoban";
import Dashen from "../dashen/dashen";
import Message from '../message/message';
import Personal from '../personal/personal';
import Chat from '../chat/chat';
import NavFooter from "../../components/navfooter/navfooter";
import NotFound from "../../components/not-found/not-fond";
import {getUser} from '../../redux/actions';
import {getRedirect} from "../../utils";


class Main extends Component {
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ];

  componentDidMount() {
    const id = Cookies.get('userid');
    const user = this.props.user;
    if (id && !user._id) {
      this.props.getUser();
    }
  }

  render() {
    const path = this.props.location.pathname;
    const {user, unReadCount} = this.props;
    // console.log(unReadCount);
    const {navList} = this;
    //如果是根路径,通过判断去那个路径

    const currentNav = navList.find(function (nav, index) {
      return nav.path === path;
    });
    const userid = Cookies.get('userid');
    //判断有没有userid的cookie,如果没有,就跳转到登陆界面
    if (!userid) {
      return <Redirect to='/login'/>
    }
    //如果有userid的cookie,判断是否登陆,如果没有登陆,去服务器请求数据
    if (!user._id) {
      return null;
    }
    if (path === '/') {
      return <Redirect to={getRedirect(user.type, user.header)}/>
    }
    //根据用户的type类型,判断最下面导航该显示哪个
    if (user.type === 'dashen') {
      navList[0].hide = true;
      navList[1].hide = false;
    } else {
      navList[1].hide = true;
      navList[0].hide = false;
    }


    return (
      <div>
        {currentNav ? <NavBar className='fixed-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main);