/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/allocate/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday December 6th 2017 9:45:04 am
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 6th 2017 9:45:04 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
// import moment from 'moment';
import { Table, Form, Row, Col, DatePicker, Select, Input, Icon, Button } from 'antd';
import { createOrder } from '../../models/allocate';
import EnterNext from '../../components/enter/enter';
import { SearchInput } from './searchCargo';
import { fxf, objDeepCopy, limitTowDecimals } from '../../util/tools';
import './style.less';

const userInfo = JSON.parse(localStorage.userInfo);
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const Option = Select.Option;

const columns = target => [
  {
    title: '',
    dataIndex: 'operation',
    key: 'operation',
    render(text, record) {
      return <span className="operation-p-m"><Icon type="plus-circle-o" className="plus-circle-o" onClick={() => target.plus(record)} /><Icon type="minus-circle-o" onClick={() => target.minus(record)} /></span>;
    },
  }, {
    title: '物资',
    dataIndex: 'col1',
    key: 'col1',
    children: [
      {
        title: '编码',
        dataIndex: 'productCode',
        key: 'productCode',
      }, {
        title: '名称',
        dataIndex: 'referenceType',
        key: 'referenceType',
        width: 100,
        render(text, record) {
          return (
            <div>
              <EnterNext focusFlag={target.state.focus} index={target.state.currentId} enterName={`${record.id}referenceType-enter`}>
                <SearchInput
                  storageCode={target.state.outStorageCode}
                  onSelect={value => target.referenceTypeChange(value, record)}
                  placeholder="输入物资"
                  disabled={target.state.disabled}
                  style={{ width: '100%' }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '规格',
        dataIndex: 'productSpce',
        key: 'productSpce',
        render(text) {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
      }, {
        title: '库存',
        dataIndex: 'qty',
        key: 'qty',
      }, {
        title: '单位',
        dataIndex: 'unitName',
        key: 'unitName',
      },
    ],
  }, {
    title: '标准单位',
    dataIndex: 'col2',
    key: 'col2',
    children: [
      {
        title: '数量',
        dataIndex: 'transQty',
        key: 'transQty',
        width: 100,
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}qty-enter`}>
                <Input
                  value={text}
                  placeholder="数量"
                  disabled={target.state.disabled}
                  onChange={(e) => {
                    const value = limitTowDecimals(e.target.value);
                    record.transQty = value;
                    const subQty = fxf(value, record.conversionFactor);
                    record.subQty = subQty;
                    record.subAmount = fxf(subQty, record.subUnitPrice);

                    if (value && record.unitPrice) {
                      record.offsetAmount = fxf(value, record.unitPrice);
                    } else if (record.unitPrice === '' || record.unitPrice === undefined || value === '' || value === undefined) {
                      record.offsetAmount = '';
                    } else if (value === 0 || record.unitPrice === 0) {
                      record.offsetAmount = 0;
                    }
                    target.forceUpdate();
                  }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      }, {
        title: '金额',
        dataIndex: 'offsetAmount',
        key: 'offsetAmount',
      },
    ],
  }, {
    title: '辅助单位',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '数量',
        dataIndex: 'subQty',
        key: 'subQty',
      }, {
        title: '单价',
        dataIndex: 'subUnitPrice',
        key: 'subUnitPrice',
      }, {
        title: '单位',
        dataIndex: 'subUnitName',
        key: 'subUnitName',
      }, {
        title: '金额',
        dataIndex: 'subAmount',
        key: 'subAmount',
      },
    ],
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 100,
    render(text, record) {
      return (
        <div>
          <EnterNext
            enterName={`${record.id}remark-enter`}
            enterFunc={() => {
              target.plus(record);
            }}
          >
            <Input
              disabled={target.state.disabled}
              onChange={(e) => {
              const { value } = e.target;
              record.lotId = value;
              record.remark = value;
              target.forceUpdate();
            }}
            />
          </EnterNext>
        </div>);
    },
  },
];
@BaseActions
@Selecter(['codeModel', 'uvsModel'], { createOrder })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      list: [{ id: 0 }],
      maxId: 0,
      disabled: true,
      outStorageCode: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.outStorageOnSelect = this.outStorageOnSelect.bind(this);
  }
  plus(record) {
    const list = this.state.list;
    list.some((item, index) => {
      if (item.id === record.id) {
        this.state.currentId = index + 1;
        list.splice(index + 1, 0, {
          id: this.state.maxId + 1,
        });
        this.state.maxId = this.state.maxId + 1;
        return true;
      }
      return false;
    });
    this.setState({
      list,
    });
  }
  minus(record) {
    const list = this.state.list;
    if (list.length > 1) {
      list.some((item, index) => {
        if (item.id === record.id) {
          const currentId = index;
          this.state.currentId = 1;
          list.splice(currentId, 1);
          return true;
        }
        return false;
      });
      this.setState({
        list,
      });
    }
  }
  referenceTypeChange(value, record) {
    if (!value) {
      return false;
    }
    record.inventoryDetailId = value.inventoryDetailId;
    record.inventoryId = value.inventoryId;
    record.productCode = value.productCode;
    record.productSpce = value.productSpce;
    record.qty = value.qty;
    record.unitId = value.unitId;
    record.unitName = value.unitName;
    record.unitPrice = value.unitPrice;
    record.conversionFactor = value.conversionFactor;
    record.subUnitPrice = value.subUnitPrice;
    record.subUnitName = value.subUnitName;
    record.remark = value.remark;
    record.transQty = '';
    record.offsetAmount = '';

    this.setState({
      list: this.state.list,
    });
  }
  outStorageOnSelect(value) {
    if (this.state.providerCode !== value) {
      this.setState({
        outStorageCode: value,
        disabled: false,
        focus: true,
        list: [{ id: 0 }],
      }, () => {
        this.setState({
          focus: false,
        });
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const value = objDeepCopy(fields);
        value.details = this.state.list;
        value.instockDate = fields.transDate.format(dateFormat);
        value.providerId = 1;
        value.instockUser = 2;
        const { createOrder } = this.props.actions;
        console.log(value);
        console.log(JSON.stringify(value));
        createOrder(value);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list } = this.state;
    const { TYPE_CODE_DBLX } = this.props.codeModel;
    const { storages } = this.props.uvsModel;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="allocate_view_container">
        <Form
          className="ant-advanced-search-form"
        >
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="出库类型"
              >
                {getFieldDecorator('transType', {
                    rules: [
                      { required: true, message: '请选择单据类型!' },
                    ],
                  })(
                    <Select>
                      {
                        TYPE_CODE_DBLX.map(x => (
                          <Option
                            key={x.code}
                            value={x.code}
                          >{x.value}
                          </Option>)
                      )}
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="入库日期"
              >
                {getFieldDecorator('transDate', {
                    rules: [
                      { required: true, message: '请选择入库日期!' },
                    ],
                  })(
                    <DatePicker style={{ width: '100%' }} />
                  )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="制单人"
              >
                {getFieldDecorator('instockUserName', {
                  initialValue: userInfo.userName,
                })(
                  <Input disabled />
              )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="出库仓位"
              >
                {getFieldDecorator('outStorageCode', {
                    rules: [
                      { required: true, message: '请选择出库仓位!' },
                    ],
                  })(
                    <Select
                      onSelect={this.outStorageOnSelect}
                    >
                      {
                        storages.map(x => (
                          <Option
                            key={x.storageCode}
                            value={x.storageCode}
                          >{x.storageName}
                          </Option>)
                    )}
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="入库仓位"
              >
                {getFieldDecorator('inStorageCode', {
                    rules: [
                      { required: true, message: '请选择入库仓位!' },
                    ],
                  })(
                    <Select>
                      {
                        storages.map(x => (
                          <Option
                            key={x.storageCode}
                            value={x.storageCode}
                          >{x.storageName}
                          </Option>)
                    )}
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="出库说明"
              >
                {getFieldDecorator('transDesc', {
                  })(
                    <Input />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          bordered
          className="view-data-table"
          dataSource={list}
          columns={this.state.columns}
          rowKey="id"
          pagination={false}
        />
        <Row style={{ marginTop: 20 }}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
            <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
            <Button className="operation-button" loading={false} type="primary" onClick={this.handleSubmit} style={{ marginLeft: 25 }}>保存</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = Form.create()(View);
