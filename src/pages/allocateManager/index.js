/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/allotcateManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Saturday November 18th 2017 3:24:54 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 18th 2017 3:24:54 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';

import { Table, Form, Row, Col, DatePicker, Select, Input, Button } from 'antd';
import { queryList } from '../../models/allocate';
import { objDeepCopy } from '../../util/tools';
import './style.less';

const RangePicker = DatePicker.RangePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

const columns = target => [
  {
    title: '单号',
    dataIndex: 'transCode',
    key: 'transCode',
    render(text) {
      return (
        <span className="table-operation" onClick={() => target.props.baseActions.linkTo(`/allocate-detail?transCode=${text}`)} >{text}</span>
      );
    },
  }, {
    title: '单据类型',
    dataIndex: 'transTypeName',
    key: 'transTypeName',
  }, {
    title: '出库日期',
    dataIndex: 'transDate',
    key: 'transDate',
  }, {
    title: '出库数量',
    dataIndex: 'transQty',
    key: 'transQty',
  }, {
    title: '出库金额（税前）',
    dataIndex: 'transAmount',
    key: 'transAmount',
  }, {
    title: '出库金额（税后）',
    dataIndex: 'transAmountWithtax',
    key: 'transAmountWithtax',
  }, {
    title: '出库仓库名称',
    dataIndex: 'outStorageName',
    key: 'outStorageName',
  }, {
    title: '入库仓名称',
    dataIndex: 'inStorageName',
    key: 'inStorageName',
  }, {
    title: '制单人',
    dataIndex: 'transUserName',
    key: 'transUserName',
  }, {
    title: '制单时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];
@BaseActions
@Selecter(['allocate', 'codeModel', 'uvsModel'], { queryList })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      list: [{ id: 0 }],
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.loadData();
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
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const value = objDeepCopy(fields);
        delete value.transDate;
        if (fields.transDate) {
          value.transDateBegin = fields.transDate.length ? fields.transDate[0].format(dateFormat) : '';
          value.transDateEnd = fields.transDate.length ? fields.transDate[1].format(dateFormat) : '';
        }
        this.loadData(value);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, total, loading, transAmount, transAmountWithtax, transQty } = this.props.allocate;
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
      <div className="allocate_manager_view_container">
        <div className="view-operation-bar">
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="单据类型"
                >
                  {getFieldDecorator('transType')(
                    <Select>
                      <Option
                        key="none"
                        value=""
                      >类型不限
                      </Option>
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
                  label="单号"
                >
                  {getFieldDecorator('transCode')(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="制单人"
                >
                  {getFieldDecorator('transUserName')(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="出库日期"
                >
                  {getFieldDecorator('transDate', {
                    rules: [{ type: 'array', message: 'Please select time!' }],
                  })(
                    <RangePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="出库仓"
                >
                  {getFieldDecorator('outStorageCode')(
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
                  label="入库仓"
                >
                  {getFieldDecorator('inStorageCode')(
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
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button className="operation-button" type="primary" htmlType="submit">查询</Button>
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
          rowKey="transCode"
          scroll={{ x: 900 }}
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
          footer={() => {
                    return (
                      <div className="cargo-bottom">
                        <span>合计</span>
                        <span style={{ marginLeft: 30 }}>出库数量：{transQty}</span>
                        <span style={{ marginLeft: 30 }}>出库金额（税前）：￥{transAmount}</span>
                        <span style={{ marginLeft: 30 }}>出库金额（税后）：￥{transAmountWithtax}</span>

                      </div>);
                  }}
        />
      </div>
    );
  }
}

module.exports = Form.create()(View);
