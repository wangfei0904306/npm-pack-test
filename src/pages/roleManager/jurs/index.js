/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/roleManager/jurs/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 16th 2017 4:19:52 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 16th 2017 4:19:52 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Table, Form, Row, Col, Input, Select, Button, Checkbox } from 'antd';
import { queryList, createRole, detailRole, editRole, batchDispatchJur } from '../../../models/jur';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;
const checkboxChange = (e, target, obj) => {
  const checked = e.target.checked;
  obj.checked = e.target.checked;
  target.selectedOptionAndUpdate(obj, obj.pId, checked);
  target.forceUpdate();
};
const operations = (target, data) => data.map((item) => {
  return (
    <Checkbox
      key={item.id}
      onChange={e => checkboxChange(e, target, item)}
      checked={item.checked}
    >{item.name}
    </Checkbox>
  );
});
const columns = target => [
  {
    title: '功能权限',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  }, {
    title: '操作权限',
    dataIndex: 'operations',
    key: 'operations',
    render: text => (
      <div className="table-operation">
        { text && operations(target, text)}
      </div>
    ),
  },
];
const selectOperations = (obj, status) => {
  if (obj.operations) {
    obj.operations.forEach((item) => {
      item.checked = status;
    });
  }
};
const findChildren = (obj, selected, key, ret) => {
  if (selected) {
    ret.set.add(obj[key]);
    selectOperations(obj, true);
  } else {
    ret.set.delete(obj[key]);
    selectOperations(obj, false);
  }
  if (obj.children && obj.children.length) {
    obj.children.forEach((element) => {
      findChildren(element, selected, key, ret);
    }, this);
  }
  return ret;
};

const findPath = (array, b, key, func, path = []) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.children && element.children.length) {
      path.push(element[key]);
      if (element[key].toString() === b.toString()) {
        return func(path.concat());
      }
      findPath(element.children, b, key, func, path);
    } else if (element[key].toString() === b.toString()) {
      path.push(element[key]);
      return func(path.concat());
    }
    if (i === array.length - 1) {
      path.pop();
    }
  }
};
const loopData = (data) => {
  data.forEach((item) => {
    selectOperations(item, false);
    if (item.children && item.children.length) {
      loopData(item.children);
    }
  });
};

const getOperationsSelected = (data) => {
  const ret = [];
  const loop = (data) => {
    data.forEach((item) => {
      if (item.operations && item.operations.length) {
        item.operations.forEach((el) => {
          if (el.checked) {
            ret.push(el.id);
          }
        });
      }
      if (item.children && item.children.length) {
        loop(item.children);
      }
    });
  };
  loop(data);
  return ret;
};
const getMenuSelected = (data) => {
  const ret = [];
  data.forEach((item) => {
    if (item.checked && item.isMenu === 1) {
      ret.push(item.id);
    }
  });
  return ret;
};

@Notification
@BaseActions
@Selecter(['jur'], { queryList, createRole, detailRole, editRole, batchDispatchJur })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      selectedRowKeys: [],
      params: {},
    };
    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedOptionAndUpdate = this.selectedOptionAndUpdate.bind(this);
  }
  componentDidMount() {
    const { detailRole } = this.props.actions;
    const { rollBack } = this.props.baseActions;
    rollBack('jur');
    const { roleId } = this.props.location.state;
    this.loadData({ roleId });

    if (roleId) {
      detailRole({ roleId });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const operations = getOperationsSelected(this.props.jur.list);
        fields.permissions = [].concat(operations, this.state.selectedRowKeys);
        const { roleId, roleIds } = this.props.location.state;
        const { createRole, editRole, batchDispatchJur } = this.props.actions;
        // 判断是否为编辑
        if (roleId) {
          fields.roleId = roleId;
          editRole(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.linkTo('/role-manager');
              const { postNotification } = this.props.notification;
              postNotification('roleListUpdate');
            }
          });
        } else if (roleIds) { // 是否是批量添加
          batchDispatchJur({
            roleIds,
            permIds: fields.permissions,
          }).then((res) => {
            if (res.success) {
              this.props.baseActions.linkTo('/role-manager');
              const { postNotification } = this.props.notification;
              postNotification('roleListUpdate');
            }
          });
        } else {
          createRole(fields).then((res) => {
            if (res.success) {
              this.props.baseActions.linkTo('/role-manager');
              const { postNotification } = this.props.notification;
              postNotification('roleListUpdate');
            }
          });
        }
      }
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { queryList } = this.props.actions;
    queryList(this.state.params).then((res) => {
      this.setState({
        selectedRowKeys: getMenuSelected(res.obj),
      });
    });
  }
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
  selectedOptionAndUpdate(record, id, selected) {
    const set = new Set(this.state.selectedRowKeys);
    if (selected) {
      findPath(this.props.jur.list, id, 'id', (ret) => {
        ret.forEach((el) => {
          set.add(el);
        }, this);
      });
    }
    const ret = { set };
    findChildren(record, selected, 'id', ret);
    this.setState({
      selectedRowKeys: [...set],
    });
  }
  render() {
    const { list, loading, btnLoading, detail } = this.props.jur;
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
      onSelect: (record, selected) => {
        this.selectedOptionAndUpdate(record, record.id, selected);
      },
      onSelectAll: (selected, selectedRows) => {
        const ret = [];
        if (selected) {
          selectedRows.forEach((element) => {
            selectOperations(element, true);
            ret.push(element.id);
          }, this);
        } else {
          loopData(this.props.jur.list);
        }
        this.setState({
          selectedRowKeys: ret,
        });
      },
      selectedRowKeys: this.state.selectedRowKeys,
    };
    const isBatch = this.props.location.state.roleIds;
    return (
      <div className="jur_view_container">
        <div className="view-operation-bar">
          <Form
            onSubmit={this.handleSubmit}
          >
            {
              !isBatch &&
              <div>
                <p className="section-base-title">基本信息</p>
                <Row>
                  <Col span={6}>
                    <FormItem
                      {...formItemLayout}
                      label="角色名称"
                    >
                      {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: '请填写机构名称!' },
                      ],
                      initialValue: detail.name,
                    })(
                      <Input />
                    )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      {...formItemLayout}
                      label="角色状态"
                    >
                      {getFieldDecorator('isActive', {
                      initialValue: detail.isActive,
                    })(
                      <Select >
                        <Option value="Y">启用</Option>
                        <Option value="N">禁用</Option>
                      </Select>
                  )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      {...formItemLayout}
                      label="备注"
                    >
                      {getFieldDecorator('description', {
                  initialValue: detail.description,
                })(
                  <Input />
                )}
                    </FormItem>
                  </Col>
                </Row>
              </div>
            }
            <p className="section-jur-title">权限信息</p>
            <Table
              bordered
              loading={loading}
              className="view-data-table"
              dataSource={list}
              columns={this.state.columns}
              rowKey="id"
              scroll={{ x: 900 }}
              pagination={false}
              rowSelection={rowSelection}
            />
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
                <Button className="operation-button" loading={btnLoading} type="primary" htmlType="submit" style={{ marginLeft: 25 }}>保存</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Form.create()(View);
