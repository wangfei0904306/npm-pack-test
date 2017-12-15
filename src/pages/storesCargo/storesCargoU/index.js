/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/storesCargoU/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday December 5th 2017 3:04:51 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday December 5th 2017 3:04:51 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { tabBarDecrement } from 'tomatobean/actions/kitAction';
import moment from 'moment';
import { Table, Form, Row, Col, Select, Input, Icon, Button, message } from 'antd';
import { upDateCargo, getCargoDetail } from '../../../models/cargo';
import EnterNext from '../../../components/enter/enter';
import { SearchInput } from '../../../components/checkSearch';
import { fxf, limitTowDecimals } from '../../../util/tools';
import './style.less';

// const dateFormat = 'YYYY-MM-DD';
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
        title: '物资编码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 80,
      }, {
        title: '物资名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 100,
        render(text, record) {
          return (
            <div>
              <EnterNext index={target.state.currentId} enterName={`${record.id}referenceType-enter`}>
                <SearchInput
                  onSelect={value => target.referenceTypeChange(value, record)}
                  value={text}
                  placeholder="输入物资"
                  style={{ width: 100 }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '规格',
        dataIndex: 'productSpec',
        key: 'productSpec',
        render(text) {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
      }, {
        title: '起订量',
        dataIndex: 'minNum',
        key: 'minNum',
        render(text) {
          return (
            <span title={text}>
              {text}
            </span>
          );
        },
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
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}qty-enter`}>
                <Input
                  value={text}
                  placeholder="数量"
                  style={{ width: 80 }}
                  onChange={(e) => {
                    const value = limitTowDecimals(e.target.value);
                    record.requireNum = value;
                    if (value && record.unitPrice) {
                      record.requireAmount = fxf(fxf(parseFloat(record.minNum, 0), value), (record.unitPrice));
                      record.requireQty = fxf(parseFloat(record.minNum, 0), value);
                    } else if (record.unitPrice === '' || record.unitPrice === undefined || value === '' || value === undefined) {
                      record.requireAmount = 0;
                      record.requireQty = 0;
                    } else if (value === 0 || record.unitPrice === 0) {
                      record.requireAmount = 0;
                      record.requireQty = 0;
                    }
                    // target.forceUpdate();
                    target.setState({ record }, () => {
                      let reqNum = 0; let totalPrice = 0;
                      target.state.list.map((v) => {
                        reqNum += v.requireQty;
                        totalPrice += v.requireAmount;
                        return true;
                      });
                      target.setState({ reqNum, totalPrice: totalPrice.toFixed(2) });
                    });
                  }}
                />
              </EnterNext>
            </div>);
        },
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
        render: text => (text && text.toFixed(2)),
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
              onChange={(e) => {
              const { value } = e.target;
              record.remark = value;
              target.forceUpdate();
            }}
              style={{ width: 80 }}
            />
          </EnterNext>
        </div>);
    },
  },
];
@Notification
@BaseActions
@Selecter(['cargo', 'uvsModel'], { upDateCargo, tabBarDecrement, getCargoDetail })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      list: [{ idIndex: 0 }],
      maxId: 0,
      reqNum: 0,
      totalPrice: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { getCargoDetail } = this.props.actions;
    const id = this.props.location.query.id;
    getCargoDetail({ id }).then((res) => {
      console.log(res);
      if (res.obj) {
        res.obj.detailModelList.map((v, index) => {
          v.idIndex = index;
          return true;
        });
        // console.log(res.obj);
        this.setState({ list: res.obj.detailModelList,
          reqNum: res.obj.requireQtyNum,
          totalPrice: res.obj.getRequireAmountNum.toFixed(2) });
      }
    });
  }
  plus(record) {
    const list = this.state.list;
    // const { detailObj } = this.props.cargo;
    // console.log(detailObj);
    list.some((item, index) => {
      if (item.idIndex === record.idIndex) {
        this.state.currentId = index + 1;

        list.splice(index + 1, 0, {
          idIndex: this.state.maxId + 1,
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
        if (item.idIndex === record.idIndex) {
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
    console.log(value);
    const { list } = this.state;
    console.log(list);
    const flag = list.some((v) => {
      return v.productId === value.productId;
    });
    console.log(flag);
    if (flag) {
      message.warning('该物质已添加在列表中！');
      return;
    }
    if (value) {
      record.productCode = value.productCode;
      record.productId = value.productId;
      record.productSpec = value.productSpce; // 规格
      record.productName = value.productName;
      record.minNum = value.elseProObj.minNum || 0;
      record.unitPrice = value.elseProObj.price; // 单价
      record.requireQtyUnitName = value.elseProObj.unit.description; // 采购量单位
      record.unitPriceUnitName = value.elseProObj.priceUnit.description; // 价格单位
      record.requireAmount = 0; // 订购量
      record.planReceiptDate = value.elseProObj.receivedDate;
    }
    this.setState({
      list: this.state.list,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.tabBarDecrement(this.props.location);
    const obj = {};
    const items = [];
    obj.id = this.props.location.query.id;
    this.state.list.map((v) => {
      items.push({
        id: v.id,
        productCode: v.productCode,
        productId: v.productId,
        requireNum: parseInt(v.requireNum, 0),
        remark: v.remark,
      });
      return true;
    });
    obj.items = items;
    const { upDateCargo } = this.props.actions;
    upDateCargo(obj).then((res) => {
      if (res.success) {
        this.props.baseActions.goBack();
        // this.props.actions.tabBarDecrement(this.props.location);
        const { postNotification } = this.props.notification;
        postNotification('dataUpdate');
      } else {
        message.error(res.msg);
      }
    });
    console.log(obj);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { storages } = this.props.uvsModel;
    const { detailObj } = this.props.cargo;
    // if (detailObj) {
    //   detailObj.detailModelList.map((v, index) => {
    //     v.idIndex = index;
    //     return true;
    //   });
    // }
    const { list, reqNum, totalPrice } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div className="direct_allocate_create_view_container">
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
          <span>李四</span>
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
            <span>{moment().format('YYYY-MM-DD')}</span>
        )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    {...formItemLayout}
                    label="档口"
                  >
                    {getFieldDecorator('deptId', {
              initialValue: storages && storages.length > 0 ? storages[0].name : '',
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
            <span>未通过</span>
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
                <span style={{ marginLeft: 30 }}>订购数量：{reqNum}</span>
                <span style={{ marginLeft: 30 }}>采购金额：￥{totalPrice}</span>
              </div>);
          }}
            bordered
            className="view-data-table"
            dataSource={list}
            columns={this.state.columns}
            rowKey="id"
            // scroll={{ x: 1500 }}
            pagination={false}
          />
          <Row style={{ marginTop: 20 }}>
            <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
              <Button className="operation-button" style={{ marginLeft: 25 }} onClick={this.props.baseActions.goBack}>返回</Button>
              <Button className="operation-button" loading={false} type="primary" onClick={this.handleSubmit} style={{ marginLeft: 25 }}>保存</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

module.exports = Form.create()(View);

