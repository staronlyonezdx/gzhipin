import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from "./actions-type";
import {reqRegister, reqLogin, reqUpdateUser,reqUser} from "../api";

const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
const errorMsg = msg => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user});
const resetUser = msg => ({type: RESET_USER, data: msg});

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
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  }
}