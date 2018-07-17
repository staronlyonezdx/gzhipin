import React from "react";
import logo from "./imgs/logo.png";
import "./index.less";


export default function Logo() {
  return (
    <div className="logo-container">
      <img className="logo-img" src={logo} alt="logo"/>
    </div>
  )
}