/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/createUser/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 2:11:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 20th 2017 2:11:02 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Form, Row, Col, Input, Select, Button, Transfer } from 'antd';
import { createUser, roleList, getDeptList, userDetail, editUser } from '../../../models/userCU';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;

@Notification
@BaseActions
@Selecter(['userCU'], { roleList, createUser, getDeptList, userDetail, editUser })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { roleList, getDeptList, userDetail } = this.props.actions;
    roleList();
    const { orgId, userId } = this.props.location.state;
    getDeptList({ orgId });
    if (userId) {
      userDetail({ userId });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const { detail } = this.props.userCU;
        const roleIds = this.state.targetKeys || detail.roles;
        fields.roleIds = roleIds;
        const { createUser, editUser } = this.props.actions;
        const { orgId, userId } = this.props.location.state;
        fields.orgId = orgId;
        if (userId) {
          fields.userId = userId;
          editUser(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.goBack();
              const { postNotification } = this.props.notification;
              postNotification('userListUpdate');
            }
          });
        } else {
          createUser(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.goBack();
              const { postNotification } = this.props.notification;
              postNotification('userListUpdate');
            }
          });
        }
      }
    });
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }
  render() {
    const { loading, detail, roleList, userTypes, deptList } = this.props.userCU;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div className="user_cu_view_container">
        <div className="view-operation-bar">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Row className="section-base-title">基本信息</Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="登录账号"
                >
                  {getFieldDecorator('userLogin', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.user.userLogin,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    initialValue: detail.user.password,
                  })(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="状态"
                >
                  {getFieldDecorator('isActive', {
                    initialValue: detail.user.isActive,
                  })(
                    <Select >
                      <Option value="Y">启用</Option>
                      <Option value="N">禁用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="员工名称"
                >
                  {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: '请填写机构名称!' },
                  ],
                  initialValue: detail.user.userName,
                })(
                  <Input />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="简写"
                >
                  {getFieldDecorator('simplifyName', {
                  initialValue: detail.user.simplifyName,
                })(
                  <Input />
              )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="部门"
                >
                  {getFieldDecorator('deptId', {
                    rules: [
                      { required: true, message: '请填写人员类型!' },
                    ],
                    initialValue: detail.user.deptId ? detail.user.deptId.toString() : detail.user.deptId,
                  })(
                    <Select>
                      {
                      deptList.map(x => (
                        <Option
                          key={x.id.toString()}
                          value={x.id.toString()}
                        >{x.name}
                        </Option>)
                    )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="人员类型"
                >
                  {getFieldDecorator('userTypeCode', {
                    rules: [
                      { required: true, message: '请填写人员类型!' },
                    ],
                    initialValue: detail.user.userTypeCode,
                  })(
                    <Select>
                      {
                        userTypes.map(x => (
                          <Option
                            key={x.code.toString()}
                            value={x.code.toString()}
                          >{x.codeName}
                          </Option>)
                      )}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="section-jur-title">权限信息</Row>
            <div style={{
              marginLeft: '2%',
            }}
            >
              <Transfer
                dataSource={roleList}
                showSearch
                titles={['全部权限', '已选权限']}
                notFoundContent="列表为空"
                searchPlaceholder="搜索"
                rowKey={record => record.roleId}
                targetKeys={this.state.targetKeys || detail.roles}
                listStyle={{
                    width: 250,
                    height: 300,
                  }}
                onChange={this.handleChange}
                render={item => `${item.roleName}(${item.description})`}
              />
            </div>
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
                <Button className="operation-button" loading={loading} type="primary" htmlType="submit" style={{ marginLeft: 25 }}>保存</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Form.create()(View);
