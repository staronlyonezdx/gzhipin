import {combineReducers} from "redux";

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSG,
  RECEIVE_CHAT_MSGS,
  CHAT_MSG_READ
} from "./actions-type";
import {getRedirect} from "../utils/index";

const initState = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
};

function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS :
      const user = action.data;
      return {...user, redirectTo: getRedirect(user.type, user.header)};
    case ERROR_MSG :
      const msg = action.data;
      return {...state, msg};
    case RECEIVE_USER :
      return action.data;
    case RESET_USER :
      return {...initState, msg: action.data};
    default:
      return state;
  }
};

const initUserList = [];

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST :
      return action.data;
    default :
      return state;
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
};

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_CHAT_MSGS :
      const {users, chatMsgs, meId} = action.data;
      // console.log(action.data);
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preUnread, msg) => {
          return preUnread + ((!msg.read && msg.to === meId) ? 1 : 0);
        }, 0)
      };
    case RECEIVE_CHAT_MSG :
      const data = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, data.chatMsg],
        unReadCount: state.unReadCount + ((!data.chatMsg.read && data.chatMsg.to === data.meId) ? 1 : 0)
      };
    case CHAT_MSG_READ :
      const {from, to, count} = action.data;
      // console.log(count);
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (!msg.read && msg.from === from && msg.to === to) {
            return {...msg, read: true};
          }
          return msg;
        }),
        unReadCount: state.unReadCount - count
      };
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat
})

