import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Popover } from 'antd';
import { toggle } from '../../internarModels/internal';
import './indexHeader.less';
import NavLink from '../navLink/NavLink';

function modifyPasswprd() {
  location.href = '/modify-pwd';
}

const content = (
  <div>
    <NavLink to={{ pathname: '/modify-pwd' }}>修改密码</NavLink>
  </div>
);
@Selecter(['internal'], { toggle })
export default class IndexHeader extends Component {
    exit=() => {
      const option = {
        url: `${host}/managers/logout`,
        method: 'post',
      };
      $.ajax({
        url: option.url,
        method: option.method || 'GET',
        data: option.data || {},
        dataType: 'json',
        beforeSend(request) {
          request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          if (localStorage.token) {
            request.setRequestHeader('token', localStorage.token);
          }
        },
        contentType: option.contentType || 'application/json',
        success(data) {
          localStorage.clear();
          location.href = '/login.html';
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          if (XMLHttpRequest.status == 401) {
            if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.code == '401') {
              message.error(XMLHttpRequest.responseJSON, 2);
              setTimeout(() => {
                window.location.href = '/login.html';
              }, 1000);
            }
          }
          if (error) {
            error(XMLHttpRequest.responseJSON);
          }
        },
      });
    };
    toggled = () => {
      console.log(this.props.internal.collapsed);
      this.props.actions.toggle({ collapsed: !this.props.internal.collapsed });
      if (this.props.internal.collapsed) {
        $('.App-childRoutes').css('padding-left', '80px').css('transition', 'padding-left .3s ease-in-out');
        $('.indexHeader .headerTitle').css('padding-left', '80px').css('transition', 'padding-left .3s ease-in-out');
        $('.tabBarLocations').css('padding-left', '80px').css('transition', 'padding-left .3s ease-in-out');
      } else {
        $('.App-childRoutes').css('padding-left', '170px').css('transition', 'padding-left .3s ease-in-out');
        $('.headerTitle').css('padding-left', '170px').css('transition', 'padding-left .3s ease-in-out');
        $('.tabBarLocations').css('padding-left', '170px').css('transition', 'padding-left .3s ease-in-out');
      }
    }

    render() {
      return (
        <div className="indexHeader">
          <div className="headerTitle">
            <p href="" className="sidebar-toggle fa fa-outdent" id="sidebar" style={{ color: '#000' }} onClick={this.toggled}>
              <span className="sr-only" >Toggle navigation</span>
            </p>
                    供应链管理系统门店端
          </div>
          <div className="topOption">
            <span className="sysName">
              <i />
              {localStorage.user}
            </span>

            <Popover placement="bottom" title="" content={content} >
              <span className="setting">
                <i />
                         设置
              </span>
            </Popover>

            <span className="exit" onClick={() => this.exit()}>
              <i />
                    注销
            </span>
          </div>

        </div>

      );
    }
}
