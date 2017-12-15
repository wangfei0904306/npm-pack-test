/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/home/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 24th 2017 2:14:39 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday November 24th 2017 2:14:39 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { getShortcutEnters } from '../../models/home';
import imgBank from '../../util/imgBank';
import './style.less';

@BaseActions
@Selecter(['home'], { getShortcutEnters })
class View extends Component {
  componentDidMount() {
    const { getShortcutEnters } = this.props.actions;
    getShortcutEnters();
  }

  render() {
    const { enters } = this.props.home;
    const { linkTo } = this.props.baseActions;
    const loopEnters = data => data.map((item) => {
      return (
        <div key={item.shortImg} className="shortcut-enter-item" onClick={() => linkTo(item.url)}>
          <img src={imgBank(item.shortImg)} alt="takeStockIcon" className="shortcut-icon" />
          <span className="shortcut-name">{item.shortName}</span>
        </div>
      );
    });
    return (
      <div className="home-page">
        <p className="group-title">快捷进入</p>
        <div className="shortcut-enters">
          {loopEnters(enters)}
        </div>
      </div>
    );
  }
}
module.exports = View;
