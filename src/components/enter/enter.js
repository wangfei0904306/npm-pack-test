/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/storesCargoCU/enter.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Friday November 24th 2017 11:39:05 am
 * Author: youngcao
 * -----
 * Last Modified:Wednesday November 29th 2017 3:09:28 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';

const eliminate = [];
let cellIndexs = [];

class EnterNext extends Component {
  constructor(props) {
    super(props);
    cellIndexs = [];
    this.state = {};
  }
  componentDidMount() {
    eliminate.push(this.props.enterName);
    cellIndexs.push(this.props.enterName);
    $(`.${this.renderDom.className} input`).keydown((event) => {
      if (event.keyCode === 13) {
        if (this.props.enterFunc) {
          this.props.enterFunc();
          $(`.${cellIndexs[0]} input`).focus();
        } else {
          const triggerElement = document.activeElement;
          const doms = $(triggerElement).parents('div');
          for (let i = 0; i < doms.length; i++) {
            for (let j = 0; j < eliminate.length; j++) {
              if (eliminate[j] === doms[i].className) {
                $(`.${eliminate[j + 1]} input`).focus();
              }
            }
          }
        }
      }
    });
    $(`.${cellIndexs[0]} input`).focus();
  }
  // componentWillReceiveProps(nextProps) {
  // }
  // shouldComponentUpdate(nextProps) {
  //   return true;
  // }
  componentDidUpdate() {
    if (this.props.focusFlag) {
      $(`.${eliminate[0]} input`).focus();
    }
  }
  render() {
    return (
      <div className={this.props.enterName} ref={(dom) => { this.renderDom = dom; }}>
        {this.props.children}
      </div>
    );
  }
}
export default EnterNext;
