import {combineReducers} from "redux";

const initXxx = 0;
function xxx(preState = initXxx, action) {
  switch (action.type) {

    default:
      return preState;
  }
}

const initYyy = {};
function yyy(preState = initYyy, action) {
  switch (action.type) {

    default:
      return preState;
  }
}

export default combineReducers({
  xxx,
  yyy
})