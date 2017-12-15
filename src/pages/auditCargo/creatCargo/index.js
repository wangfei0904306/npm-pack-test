/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/auditCargo/creatCargo/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Wednesday December 6th 2017 7:23:40 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 6th 2017 7:23:40 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

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
import { Table, Row, Col, Button, message } from 'antd';
import { createShopOrder, creatCargoDetailList } from '../../../models/cargo';
import './style.less';

const creatColumns = () => [
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
@Selecter(['cargo'], { createShopOrder, creatCargoDetailList })
class ViewCreatCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: creatColumns(this),
    };
  }
  componentDidMount() {
    const { creatCargoDetailList } = this.props.actions;
    const ids = this.props.location.state.idItems;
    console.log(this.props.location);
    creatCargoDetailList(ids);
  }
  pass = () => {
    const { createShopOrder } = this.props.actions;
    const ids = this.props.location.state.idItems;
    createShopOrder(ids).then((res) => {
      if (res.success) {
        message.success('生成报货单成功');
        this.props.baseActions.goBack();
        // this.props.actions.tabBarDecrement(this.props.location);
        const { postNotification } = this.props.notification;
        postNotification('auditDataUpdate');
      } else {
        message.error(res.msg);
      }
    });
  }
  render() {
    const { creatList, requireAmountNum, requireQtyNum } = this.props.cargo;
    return (
      <div className="creat-cargo-page">
        <Table
          footer={() => {
            return (
              <div className="cargo-bottom">
                <span>合计</span>
                <span style={{ marginLeft: 30 }}>订购数量：{requireQtyNum || ''}</span>
                <span style={{ marginLeft: 30 }}>采购金额：￥{requireAmountNum || ''}</span>
              </div>);
          }}
          bordered
          className="view-data-table"
          dataSource={creatList}
          columns={this.state.columns}
          rowKey="productCode"
            // scroll={{ x: 1500 }}
          pagination={false}
        />
        <div>
          <Row style={{ marginTop: 20 }}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>关闭</Button>
              <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={this.pass}>提交</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

module.exports = ViewCreatCargo;

