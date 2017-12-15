/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateDetail/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 2:54:37 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 23rd 2017 2:54:37 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { Table, Row, Col, Button } from 'antd';
import Cell from '../../../components/labelValueCell';
import { getDetail } from '../../../models/directAllocateDetail';

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
        dataIndex: 'unitName',
        key: 'unitName',
      }, {
        title: '数量',
        dataIndex: 'qty',
        key: 'qty',
      }, {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
      },
    ],
  }, {
    title: '辅助单位',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '单价',
        dataIndex: 'subUnitPrice',
        key: 'subUnitPrice',
      }, {
        title: '金额',
        dataIndex: 'subAmount',
        key: 'subAmount',
      },
    ],
  }, {
    title: '档口',
    dataIndex: 'col4',
    key: 'col4',
    children: [
      {
        title: '名称',
        dataIndex: 'deptName',
        key: 'deptName',
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
@Selecter(['directAllocateDetail'], { getDetail })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      list: [{ id: 0 }],
    };
  }
  componentDidMount() {
    const { getDetail } = this.props.actions;
    const { code, typeCode } = this.props.location.query;
    getDetail({ code, typeCode });
  }

  render() {
    const { detail } = this.props.directAllocateDetail;
    const layout = {
      wrapper: 6,
      label: 8,
      content: 14,
    };
    return (
      <div className="direct_allocate_detail_view_container">
        <div className="view-operation-bar">
          <Row type="flex" align="middle" className="row-cells">
            <Cell data={{ label: '单据类型', content: detail.typeCode }} layout={layout} />
            <Cell data={{ label: '单号', content: detail.code }} layout={layout} />
            <Cell data={{ label: '制单人', content: detail.userName }} layout={layout} />
          </Row>
          <Row type="flex" align="middle" className="row-cells">
            <Cell data={{ label: '入库日期', content: detail.stockDate }} layout={layout} />
            <Cell data={{ label: '供应商', content: detail.providerName }} layout={layout} />
          </Row>
        </div>
        <Table
          bordered
          className="view-data-table"
          dataSource={detail.dircetSimpleDetails}
          columns={this.state.columns}
          rowKey="id"
          scroll={{ x: 900 }}
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
