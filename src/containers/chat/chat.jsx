/*
对话聊天的路由组件
 */

import React, {Component} from 'react';
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';

import {sendMessage, readChatMsg} from '../../redux/actions';
import Cookies from "js-cookie";

const Item = List.Item;

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  };

  componentWillMount() {
    const emojisString = '😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃😁😂🤣😃';
    const emojis = [];
    emojisString.split('').forEach(emoji => {
      emojis.push({
        text: emoji
      })
    });
    this.emojis = emojis;
  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  };

  componentDidUpdate() {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  };

  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    this.props.readChatMsg(from, to);
  }

  toggleShow = () => {
    const isShow = !this.state.isShow;
    if (isShow) {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 0)
    }
    this.setState({isShow})
  };
  send = () => {
    const {content} = this.state;
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    this.props.sendMessage({content, from, to});
    this.setState({content: ''});
  };

  render() {
    const targetId = this.props.match.params.userid;
    const {users, chatMsgs} = this.props.chat;
    if (!users[targetId]) {
      return null;
    }
    const meId = this.props.user._id;
    const chatId = [targetId, meId].sort().join("_");
    const chatIcon = require(`../../assets/imgs/${users[targetId].header}.png`);

    const msgs = chatMsgs.filter(msg => {
      return msg.chat_id === chatId;
    });
    return (
      <div id='chat-page'>
        <NavBar className='fixed-top'
                icon={<Icon type='left'/>}
                onLeftClick={() => this.props.history.goBack()}
        >{users[targetId].username}</NavBar>
        <List style={{marginBottom: 50, marginTop: 50}}>
          {
            msgs.map(msg => {
              if (msg.to === meId) {
                return (
                  <Item
                    key={msg._id}
                    thumb={chatIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }


        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={(val) => this.setState({content: val})}
            value={this.state.content}
            extra={
              <span>
                <span onClick={this.toggleShow}>😁</span>
                <span onClick={this.send}>发送</span>
              </span>
            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})
                }}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMessage, readChatMsg}
)(Chat);