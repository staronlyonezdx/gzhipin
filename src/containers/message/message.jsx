import React, {Component} from "react";
import {connect} from "react-redux";
import {List, Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {

  getLastMsgs = (chatMsgs, meId) => {
    const lastMsgObjs = {};
    chatMsgs.forEach(msg => {

      if (!msg.read && msg.to === meId) {
        msg.unReadCount = 1;
      } else {
        msg.unReadCount = 0;
      }

      const chatId = msg.chat_id;
      const lastMsg = lastMsgObjs[chatId];
      if (!lastMsg) {
        lastMsgObjs[chatId] = msg;
      } else {
        if (msg.create_time > lastMsg.create_time) {
          const unReadCount = lastMsg.unReadCount + msg.unReadCount;
          lastMsgObjs[chatId] = msg;
          lastMsgObjs[chatId].unReadCount = unReadCount;
        }
      }
    });
    // console.log(lastMsgObjs);
    const lastMsgs = Object.values(lastMsgObjs);

    lastMsgs.sort(function (m1, m2) {
      return m2.create_time - m1.create_time;
    });
    // console.log(lastMsgs,'---');
    return lastMsgs;
  };

  render() {
    const {users, chatMsgs} = this.props.chat;
    const {user} = this.props;
    const meId = user._id;
    //得到每个聊天的最后一个msg组成数组
    const lastMsgs = this.getLastMsgs(chatMsgs, meId);
    // console.log(lastMsgs);
    return (
      <List>
        {
          lastMsgs.map(msg => {
            let targetId;
            if (msg.to === meId) {
              targetId = msg.from;
            } else {
              targetId = msg.to;
            }
            const targetUser = users[targetId];
            const {username, header} = targetUser;
            // console.log(msg.unReadCount);
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                style={{marginTop: 50, marginBottom: 50}}
                thumb={require(`../../assets/imgs/${header}.png`)}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{username}</Brief>
              </Item>
            )
          })
        }

      </List>

    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message);