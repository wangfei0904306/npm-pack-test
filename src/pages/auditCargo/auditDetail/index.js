
/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateCreate/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 22nd 2017 5:32:59 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 6th 2017 5:46:06 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
// import moment from 'moment';
import { Table, Form, Row, Col, Radio, Input, Button, message } from 'antd';
import { getCargoDetail, auditCargoDetail } from '../../../models/cargo';
import './style.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const auditColumns = () => [
  {
    title: '物资',
    dataIndex: 'col1',
    key: 'col1',
    children: [
      {
        title: '物资编码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 80,
      }, {
        title: '物资名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 100,
      }, {
        title: '规格',
        dataIndex: 'productSpec',
        key: 'productSpec',
      }, {
        title: '起订量',
        dataIndex: 'minNum',
        key: 'minNum',
      },
    ],
  }, {
    title: '采购量',
    dataIndex: 'col2',
    key: 'col2',
    children: [
      {
        title: '采购数量',
        dataIndex: 'requireNum',
        key: 'requireNum',
        width: 80,
      }, {
        title: '订购量',
        dataIndex: 'requireQty',
        key: 'requireQty',
      }, {
        title: '单位',
        dataIndex: 'requireQtyUnitName',
        key: 'requireQtyUnitName',
      },
    ],
  }, {
    title: '采购价格',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '采购单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      }, {
        title: '单位',
        dataIndex: 'unitPriceUnitName',
        key: 'unitPriceUnitName',
      }, {
        title: '采购金额',
        dataIndex: 'requireAmount',
        key: 'requireAmount',
      },
    ],
  }, {
    title: '到货日期',
    dataIndex: 'receiptTime',
    key: 'receiptTime',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
];
@BaseActions
@Notification
@Selecter(['cargo'], { getCargoDetail, auditCargoDetail })
class ViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: auditColumns(this),
      value: '',
      verifyNote: '',
    };
  }
  componentDidMount() {
    const { getCargoDetail } = this.props.actions;
    const id = this.props.location.query.id;
    getCargoDetail({ id });
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  pass = () => {
    const { auditCargoDetail } = this.props.actions;
    const { verifyNote, value } = this.state;
    const parms = {
      id: this.props.location.query.id,
      approved: value,
      verifyNote,
    };
    if (value === 'N' && !verifyNote) message.warning('结果说明必填');
    else {
      auditCargoDetail(parms).then((res) => {
        if (res.success) {
          message.success('审核成功');
          this.props.baseActions.goBack();
          // this.props.actions.tabBarDecrement(this.props.location);
          const { postNotification } = this.props.notification;
          postNotification('auditDataUpdate');
        } else {
          message.error(res.msg);
        }
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailObj } = this.props.cargo;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div className="stores-cargoDetail-page">
        <div className="view-operation-bar">
          <div className="search-query">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="制单人"
                  >
                    {getFieldDecorator('requireStatus', {
          initialValue: '',
        })(
          <span>{detailObj && detailObj.createByName}</span>
      )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="报货单号"
                  >
                    {getFieldDecorator('range-picker', {
          initialValue: '',
        })(
          <span>{detailObj && detailObj.code}</span>
        )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="日期"
                  >
                    {getFieldDecorator('requireStatus', {
            initialValue: '',
          })(
            <span>{detailObj && detailObj.requireDate}</span>
        )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="档口"
                  >
                    {getFieldDecorator('deptId', {
              initialValue: '',
            })(
              <span>{detailObj && detailObj.deptName}</span>
            )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="报货单状态"
                  >
                    {getFieldDecorator('requireStatus', {
                    initialValue: '',
                  })(
                    <span>{detailObj && detailObj.requireStatus}</span>
                )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            footer={() => {
            return (
              <div className="cargo-bottom">
                <span>合计</span>
                <span style={{ marginLeft: 30 }}>订购数量：{detailObj && detailObj.requireQtyNum}</span>
                <span style={{ marginLeft: 30 }}>采购金额：￥{detailObj && detailObj.getRequireAmountNum}</span>
              </div>);
          }}
            bordered
            className="view-data-table"
            dataSource={detailObj && detailObj.detailModelList}
            columns={this.state.columns}
            rowKey="id"
            // scroll={{ x: 1500 }}
            pagination={false}
          />
          {
            detailObj && detailObj.requireStatus === '待审核' ?
              <div>
                <div style={{ fontSize: 15, marginTop: 10 }}>审核信息</div>
                <div>
                  <div style={{ marginTop: 10 }}>
                    <span>审核结果：</span>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value="Y">通过</Radio>
                      <Radio value="N">不通过</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <div style={{ marginTop: 10, display: 'flex' }}>
                  <div>结果说明：</div>
                  <TextArea rows={4} style={{ width: 300 }} value={this.state.verifyNote} onChange={(e) => { this.setState({ verifyNote: e.target.value }); }} />
                </div>
                <Row style={{ marginTop: 20 }}>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>关闭</Button>
                    <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={this.pass}>通过</Button>
                  </Col>
                </Row>
              </div> : null
          }

        </div>
      </div>
    );
  }
}

module.exports = Form.create()(ViewDetail);

