/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/storesCargoDetail/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Monday December 4th 2017 10:59:55 am
 * Author: chengpu
 * -----
 * Last Modified:Monday December 4th 2017 10:59:55 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/storesCargoAD/storesCargoAD.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday November 21st 2017 5:33:51 pm
 * Author: youngcao
 * -----
 * Last Modified:Tuesday November 21st 2017 5:33:51 pm
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
 * Last Modified:Wednesday November 29th 2017 5:47:41 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
// import moment from 'moment';
import { Table, Form, Row, Col } from 'antd';
import { getCargoDetail } from '../../../models/cargo';
import './style.less';

const FormItem = Form.Item;
const columns = () => [
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
    dataIndex: 'planReceiptDate',
    key: 'planReceiptDate',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
];
@BaseActions
@Selecter(['cargo'], { getCargoDetail })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
    };
  }
  componentDidMount() {
    const { getCargoDetail } = this.props.actions;
    const id = this.props.location.query.id;
    getCargoDetail({ id });
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
        </div>
      </div>
    );
  }
}

module.exports = Form.create()(View);

