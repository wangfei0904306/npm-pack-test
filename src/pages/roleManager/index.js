/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/roleManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 16th 2017 9:36:24 am
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 25th 2017 4:38:39 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Table, Switch, Form, Row, Button, Col, Input, Select } from 'antd';
import { queryList, disableRole } from '../../models/role';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = target => [
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    key: 'roleCode',
  }, {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '角色状态',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 100,
    render: (text, record) => (
      <span>
        <Switch defaultChecked={text === 'Y'} onChange={status => target.changeStatus(record, status)} />
      </span>
    ),
  }, {
    title: '权限分配',
    dataIndex: 'orgName',
    key: 'orgName',
    width: 100,
    render: (text, record) => (
      <span className="table-operation" onClick={() => target.editRole(record)} >
        <span className="table-edit-operation" />
        <span className="table-operation-title">权限设置</span>
      </span>
    ),
  }, {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
  },
];

@Notification
@BaseActions
@Selecter(['role'], { queryList, disableRole })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      selectedRowKeys: [],
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
    this.loadData = this.loadData.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.createRole = this.createRole.bind(this);
    this.batchDispatchJur = this.batchDispatchJur.bind(this);
  }
  componentDidMount() {
    this.loadData();
    const { observer } = this.props.notification;
    observer('roleListUpdate', () => {
      this.loadData();
    });
  }
  componentWillUnmount() {
    const { removeObserver } = this.props.notification;
    removeObserver('roleListUpdate');
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        this.loadData(fields);
      }
    });
  }
  changeStatus(record, status) {
    const { disableRole } = this.props.actions;
    disableRole({
      roleId: record.roleId,
      isActive: status ? 'Y' : 'N',
    }).then(() => {
      this.loadData();
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.queryList(this.state.params);
  }
  //
  changeParams(params) {
    if (typeof (params) === 'object') {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          this.state.params[key] = element;
        }
      }
    }
  }
  createRole() {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/jurs-dispatch', state: {} });
  }
  editRole(record) {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/jurs-dispatch', state: { roleId: record.roleId } });
  }
  batchDispatchJur() {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/jurs-dispatch', state: { roleIds: this.state.selectedRowKeys } });
  }
  render() {
    const { list, total, loading } = this.props.role;
    const { selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="role_view_container">
        <div className="view-operation-bar">
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="角色名称/编码"
                >
                  {getFieldDecorator('condition', {
                    initialValue: '',
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="角色名称/编码"
                >
                  {getFieldDecorator('isActive', {
                    initialValue: '',
                  })(
                    <Select >
                      <Option value="">不限</Option>
                      <Option value="Y">启用</Option>
                      <Option value="N">禁用</Option>
                    </Select>
                )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button className="operation-button" type="primary" htmlType="submit">查询</Button>
                <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={this.createRole}>新增</Button>
                <Button className="operation-button" disabled={this.state.selectedRowKeys.length <= 0} type="primary" style={{ marginLeft: 25 }} onClick={this.batchDispatchJur}>角色分配</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          bordered
          loading={loading}
          className="view-data-table"
          dataSource={list}
          columns={this.state.columns}
          rowKey="roleId"
          scroll={{ x: 900 }}
          rowSelection={rowSelection}
          pagination={{
                      total,
                      current: this.state.params.pageNo,
                      showSizeChanger: true,
                      pageSize: this.state.params.pageSize,
                      onChange: (pageNo) => {
                        // console.log("Current: ", current);
                        this.loadData({ pageNo });
                      },
                      onShowSizeChange: (pageNo, pageSize) => {
                        this.loadData({ pageNo, pageSize });
                      },
                    }}
        />
      </div>
    );
  }
}

module.exports = Form.create()(View);
