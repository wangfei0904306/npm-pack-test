/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/login/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 10th 2017 2:39:53 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday November 10th 2017 2:39:53 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React from 'react';
import { Selecter } from 'tomatobean';
import { Icon } from 'antd';
import BaseActions from 'tomatobean/enhance';
import { login, getValidateCodeImage } from '../../models/login';
import './style.less';

const loginBkgImage = require('assets/images/login_bkg.png');
const loginLogo = require('assets/images/login_logo.png');

@BaseActions
@Selecter(['login'], { login, getValidateCodeImage })
class CompLogin extends React.Component {
  constructor(props) {
    super(props);
    this.refreshCode = this.refreshCode.bind(this);
  }
  componentDidMount() {
    this.refreshCode();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { login } = this.props.actions;
    const { linkTo } = this.props.baseActions;
    login($('#login-form').serialize()).then((response) => {
      if (response.success) {
        localStorage.token = response.obj.token;
        localStorage.userInfo = JSON.stringify(response.obj);
        linkTo({ pathname: '/home', search: '' });
      } else {
        this.refreshCode();
      }
    });
  }
  refreshCode() {
    const { getValidateCodeImage } = this.props.actions;
    getValidateCodeImage();
  }
  render() {
    const { image, ticket } = this.props.login;
    return (
      <div className="login_view_container">
        <img src={loginBkgImage} className="Login_bkg" alt="" />
        <div className="major-box">
          <div className="major">
            <div className="major-logo">
              <img src={loginLogo} alt="" />
              <p>供应链管理系统门店端</p>
            </div>
            <div className="login-form">
              <form id="login-form" onSubmit={this.handleSubmit}>
                <div className="login-input-area">
                  <div className="username">
                    <p className="input-label">
                  用户名
                    </p>
                    <div className="custom-input">
                      <span className="user-inupt-icon inupt-icon" />
                      <input type="text" placeholder="请输入手机号/用户名" name="username" />
                    </div>
                  </div>
                  <div className="password">
                    <p className="input-label">
                  密&nbsp;&nbsp;&nbsp;码
                    </p>
                    <div className="custom-input">
                      <span className="pwd-inupt-icon inupt-icon" />
                      <input type="password" placeholder="请输入密码" name="password" />
                    </div>
                  </div>

                  <div className="validate-code">
                    <p className="input-label">
                  验证码
                    </p>
                    <div className="custom-input">
                      <span className="password-icon" />
                      <input placeholder="验证码" type="text" name="captcha" />
                      <input type="hidden" placeholder="验证码" name="ticket" value={ticket} />
                    </div>
                    <img className="validate-code-image" alt="validateCode" src={image} />
                    <Icon className="code-refresh" type="reload" onClick={this.refreshCode} />
                  </div>
                </div>
                <button className="login-button" type="submit">登录</button>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom-info">
          <p>@北京智贝数据科技有限公司 2017-2019 版权所有</p>
        </div>
      </div>
    );
  }
}
module.exports = CompLogin;
