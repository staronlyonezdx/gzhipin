/*
包含n个接口请求函数的模块
每个函数返回的都是promise对象
*/
import ajax from './ajax';
// const BASE = "http://localhost:4000";
const BASE = "";

export const reqRegister = ({username, password, type}) => ajax(BASE + "/register", {username, password, type}, "POST");

export const reqLogin = ({username, password}) => ajax(BASE + "/login", {username, password}, 'POST');

export const reqUpdateUser = (user) => ajax(BASE + '/update', user, 'POST');

export const reqUser = () => ajax(BASE + '/user');