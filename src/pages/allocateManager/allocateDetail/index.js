/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateCreate/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 22nd 2017 5:32:59 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday December 12th 2017 10:39:25 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { Table, Row, Col, Button } from 'antd';
import { getDetail } from '../../../models/allocateDetail';
import './style.less';

const columns = () => [
  {
    title: '物资',
    dataIndex: 'col1',
    key: 'col1',
    children: [
      {
        title: '编码',
        dataIndex: 'productCode',
        key: 'productCode',
        // width: 100,
      }, {
        title: '名称',
        dataIndex: 'productName',
        key: 'productName',
      }, {
        title: '规格',
        dataIndex: 'productSpec',
        key: 'productSpec',
      },
    ],
  }, {
    title: '标准单位（税前）',
    dataIndex: 'col2',
    key: 'col2',
    children: [
      {
        title: '单位',
        dataIndex: 'productUnitName',
        key: 'productUnitName',
      }, {
        title: '数量',
        dataIndex: 'transQty',
        key: 'transQty',
      }, {
        title: '单价',
        dataIndex: 'productPrice',
        key: 'productPrice',
      }, {
        title: '金额',
        dataIndex: 'transAmount',
        key: 'transAmount',
      },
    ],
  }, {
    title: '辅助单位',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '数量',
        dataIndex: 'transSubQty',
        key: 'transSubQty',
      }, {
        title: '单价',
        dataIndex: 'subProductPrice',
        key: 'subProductPrice',
      }, {
        title: '金额',
        dataIndex: 'transSubAmount',
        key: 'transSubAmount',
      },
    ],
  }, {
    title: '税后',
    dataIndex: 'col5',
    key: 'col5',
    children: [
      {
        title: '税率',
        dataIndex: 'taxRate',
        key: 'taxRate',
        render(text) {
          return (
            <div>
              {text}%
            </div>
          );
        },
      }, {
        title: '单价',
        dataIndex: 'priceWithtax',
        key: 'priceWithtax',
      }, {
        title: '金额',
        dataIndex: 'amountWithtax',
        key: 'amountWithtax',
      },
    ],
  }, {
    title: '其他',
    dataIndex: 'col6',
    key: 'col6',
    children: [
      {
        title: '生产日期',
        dataIndex: 'produceDate',
        key: 'produceDate',
      }, {
        title: '批次号',
        dataIndex: 'lotId',
        key: 'lotId',
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ],
  },
];
@BaseActions
@Selecter(['allocateDetail'], { getDetail })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
    };
  }
  componentDidMount() {
    const { getDetail } = this.props.actions;
    const { transCode } = this.props.location.query;
    getDetail(transCode);
  }

  render() {
    const { details } = this.props.allocateDetail;
    return (
      <div className="allocate_detail_view_container">
        <Table
          bordered
          className="view-data-table"
          dataSource={details}
          columns={this.state.columns}
          rowKey="productCode"
          // scroll={{ x: 1500 }}
          pagination={false}
        />
        <Row style={{ marginTop: 20 }}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
            <Button className="operation-button" onClick={this.props.baseActions.goBack}>返回</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = View;
