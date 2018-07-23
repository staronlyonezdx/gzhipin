// 引入客户端io
import io from 'socket.io-client';


import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSG,
  RECEIVE_CHAT_MSGS,
} from "./actions-type";
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUsers, reqChatMsgList} from "../api";

const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
const errorMsg = msg => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user});
export const resetUser = msg => ({type: RESET_USER, data: msg});
export const receiveUserList = userList => ({type: RECEIVE_USER_LIST, data: userList});
const receiveChatMsg = (chatMsg) => ({type: RECEIVE_CHAT_MSG, data: chatMsg});
const receiveChatMsgs = ({users, chatMsgs}) => ({type: RECEIVE_CHAT_MSGS, data: {users, chatMsgs}});


/*
注册的异步action
1. 异步执行代码(发送ajax请求)
2. 有了结果后, 根据结果不同分发不同的同步action
* */
export function register({username, password, password2, type}) {
  if (!username) {
    return errorMsg("用户名不能为空");
  } else if (!password) {
    return errorMsg("密码不能为空");
  } else if (password !== password2) {
    return errorMsg("两次密码不一致,请重新输入");
  } else if (!type) {
    return errorMsg("必须选择类型");
  }
  return async dispatch => {
    /*//执行异步代码
    reqRegister({username, password, type}).then(response => {
      const result = response.data;
      if (result.code === 0) {
        dispatch(authSuccess(result.data));
      } else {
        dispatch(errorMsg(result.msg));
      }
    })*/

    const response = await reqRegister({username, password, type});
    const result = response.data;
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
}

/*
登陆的异步action
*/
export function login({username, password}) {
  return async dispatch => {
    if (!username) {
      dispatch(errorMsg("用户名不能为空"));
      return;
    } else if (!password) {
      dispatch(errorMsg("密码不能为空"));
      return;
    }

    const response = await reqLogin({username, password});
    const result = response.data;
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  }
}

/*异步更新用户*/
export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}

/*异步获得用户信息*/
export function getUser() {
  return async dispatch => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getChatMsgs(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}

export function getUserList(type) {
  return async dispatch => {
    const response = await reqUsers(type);
    const result = response.data;
    // console.log(result.data);
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  }
}

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000');

function initIo(dispatch, meId) {
  if (!io.socket) {
    io.socket = socket;
    socket.on('receiveMsg', (chatMsg) => {
      // console.log(chatMsg);
      if (meId === chatMsg.from || meId === chatMsg.to)
        dispatch(receiveChatMsg(chatMsg));
    });
  }
}

export function sendMessage({content, from, to}) {
  return dispatch => {
    //通过socketio向服务器发送消息
    socket.emit('sendMsg', {content, from, to});
    console.log('sendMsg', {content, from, to});

  }
}


//异步获得当前用户所有的聊天信息
async function getChatMsgs(dispatch, meId) {
  initIo(dispatch, meId);
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 0) {
    // console.log(result.data);
    const {users, chatMsgs} = result.data;
    dispatch(receiveChatMsgs({users, chatMsgs}));
  }
}