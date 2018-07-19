import React, {Component} from "react";
import {List, Grid} from "antd-mobile";
import PropTypes from "prop-types";

class HeaderSelect extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  };
  state = {
    icon: null
  };
  selectHeader = ({text, icon}) => {
    this.props.setHeader(text);
    this.setState({icon});
  };

  render() {
    const headerList = [];
    for (var i = 0; i < 20; i++) {
      const text = "头像" + (i + 1);
      headerList.push({
        text,
        icon: require(`./imgs/${text}.png`)
      })
    }
    const {icon} = this.state;
    const header = icon ? <p>您选择的头像:<img src={icon} alt="header"/></p> : '请选择头像';
    return (
      <List renderHeader={() => header}>
        <Grid data={headerList} columnNum={5} onClick={this.selectHeader}/>
      </List>
    )
  }
}

export default HeaderSelect;