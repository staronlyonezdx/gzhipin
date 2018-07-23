import {combineReducers} from "redux";

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSG,
  RECEIVE_CHAT_MSGS
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
      const {users, chatMsgs} = action.data;
      return {
        users,
        chatMsgs,
        unReadCount: 0
      };
    case RECEIVE_CHAT_MSG :
      const chatMsg = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: 0
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

