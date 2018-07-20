/*
使用axios封装的ajax请求函数
函数返回的是promise对象
 */
import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
  if (type === "GET") {
    let queryStr = "";
    Object.keys(data).forEach(key => {
      const value = data[key];
      queryStr += key + '=' + value + "&";
    });
    if (queryStr) {
      queryStr = queryStr.substring(0, queryStr.length - 1);
      queryStr = "?" + queryStr;
    }
    return axios.get(url + queryStr);
  } else {
    return axios.post(url, data);
  }
}