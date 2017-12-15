/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/userManager/createUser/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 2:11:02 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 3:36:05 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import { createDept, deptDetail, editDept } from '../../../models/deptCU';
import './style.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

@Notification
@BaseActions
@Selecter(['deptCU'], { createDept, deptDetail, editDept })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateStorage: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStorageChange = this.createStorageChange.bind(this);
  }
  componentDidMount() {
    const { deptDetail } = this.props.actions;
    const { deptId } = this.props.location.state;
    if (deptId) {
      deptDetail({ id: deptId }).then((res) => {
        this.setState({
          isCreateStorage: res.obj.isCreateStorage,
        });
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const { createDept, editDept } = this.props.actions;
        const { orgId, deptId } = this.props.location.state;
        fields.orgId = orgId;
        if (deptId) {
          fields.id = deptId;
          editDept(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.goBack();
              const { postNotification } = this.props.notification;
              postNotification('deptListUpdate');
            }
          });
        } else {
          createDept(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.goBack();
              const { postNotification } = this.props.notification;
              postNotification('deptListUpdate');
            }
          });
        }
      }
    });
  }
  createStorageChange(value) {
    this.setState({
      isCreateStorage: value === 'Y',
    });
  }
  render() {
    const { loading, detail } = this.props.deptCU;
    const { isCreateStorage } = this.state;
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
      <div className="dept_cu_view_container">
        <div className="view-operation-bar">
          <Form
            onSubmit={this.handleSubmit}
          >
            <Row className="section-base-title">基本信息</Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="部门类型"
                >
                  {getFieldDecorator('deptType', {
                    rules: [
                      { required: true, message: '请填写机构名称!' },
                    ],
                    initialValue: detail.deptType,
                  })(
                    <Select >
                      <Option value="1">临时部门1</Option>
                      <Option value="2">临时部门2</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="部门编码"
                >
                  {getFieldDecorator('code', {
                    initialValue: detail.code,
                  })(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="部门名称"
                >
                  {getFieldDecorator('name', {
                    initialValue: detail.name,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="备注"
                >
                  {getFieldDecorator('description', {
                    rules: [
                      { required: true, message: '请填写人员类型!' },
                    ],
                    initialValue: detail.description,
                  })(
                    <TextArea />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row className="section-jur-title">仓库信息</Row>
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayout}
                  label="是否创建仓库"
                >
                  {getFieldDecorator('isCreateStorage', {
                    initialValue: detail.isCreateStorage ? 'Y' : 'N',
                  })(
                    <Select onSelect={this.createStorageChange}>
                      <Option value="Y">是</Option>
                      <Option value="N">否</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              {
                isCreateStorage &&
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="是否虚拟仓库"
                  >
                    {getFieldDecorator('isVirtualStorage', {
                    initialValue: detail.isVirtualStorage,
                  })(
                    <Select >
                      <Option value="Y">是</Option>
                      <Option value="N">否</Option>
                    </Select>
                  )}
                  </FormItem>
                </Col>
              }
              {
                isCreateStorage &&
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="是否禁盘"
                  >
                    {getFieldDecorator('isNoInventory', {
                    initialValue: detail.isNoInventory,
                  })(
                    <Select >
                      <Option value="Y">是</Option>
                      <Option value="N">否</Option>
                    </Select>
                  )}
                  </FormItem>
                </Col>
              }

            </Row>
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
