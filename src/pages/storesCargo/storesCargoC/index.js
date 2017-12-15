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
import BaseActions, { Notification } from 'tomatobean/enhance';
import { tabBarDecrement } from 'tomatobean/actions/kitAction';
import moment from 'moment';
import { Table, Form, Row, Col, Select, Input, Icon, Button, message } from 'antd';
import { createCargo } from '../../../models/cargo';
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
        dataIndex: 'referenceType',
        key: 'referenceType',
        width: 100,
        render(text, record) {
          return (
            <div>
              <EnterNext index={target.state.currentId} enterName={`${record.id}referenceType-enter`} focusFlag={target.state.focusFlag}>
                <SearchInput
                  onSelect={value => target.referenceTypeChange(value, record)}
                  placeholder="输入物资"
                  style={{ width: 100 }}
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
        dataIndex: 'qty',
        key: 'qty',
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
                    record.qty = value;
                    if (value && record.price) {
                      record.offsetAmount = fxf(fxf(parseFloat(record.minNum, 0), value), (record.price));
                      record.orderQty = fxf(parseFloat(record.minNum, 0), value);
                    } else if (record.price === '' || record.price === undefined || value === '' || value === undefined) {
                      record.offsetAmount = 0;
                      record.orderQty = 0;
                    } else if (value === 0 || record.price === 0) {
                      record.offsetAmount = 0;
                      record.orderQty = 0;
                    }
                    // target.forceUpdate();
                    target.setState({ record }, () => {
                      let reqNum = 0; let totalPrice = 0;
                      target.state.list.map((v) => {
                        reqNum += v.orderQty;
                        totalPrice += v.offsetAmount;
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
        dataIndex: 'orderQty',
        key: 'orderQty',
      }, {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
      },
    ],
  }, {
    title: '采购价格',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '采购单价',
        dataIndex: 'price',
        key: 'price',
      }, {
        title: '单位',
        dataIndex: 'priceUnit',
        key: 'priceUnit',
      }, {
        title: '采购金额',
        dataIndex: 'offsetAmount',
        key: 'offsetAmount',
        render: text => (text && text.toFixed(2)),
      },
    ],
  }, {
    title: '到货日期',
    dataIndex: 'receivedDate',
    key: 'receivedDate',
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
@Selecter(['cargo', 'uvsModel'], { createCargo, tabBarDecrement })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      list: [{ id: 0 }],
      maxId: 0,
      reqNum: 0,
      totalPrice: 0,
      focusFlag: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
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
    console.log(value);
    if (value) {
      record.productCode = value.productCode;
      record.productId = value.productId;
      record.productSpce = value.productSpce;
      record.productName = value.productName;
      record.minNum = value.elseProObj.minNum || 0;
      record.price = value.elseProObj.price;
      record.unit = value.elseProObj.unit.description;
      record.priceUnit = value.elseProObj.priceUnit.description;
      record.orderQty = 0; // 订购量
      record.receivedDate = value.elseProObj.receivedDate;
    }
    this.setState({
      list: this.state.list,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      this.props.actions.tabBarDecrement(this.props.location);
      const { depts } = this.props.uvsModel;
      let deptCode = depts[0].code; let deptName = depts[0].name;
      depts.some((v) => {
        if (fieldsValue.deptId === v.id) {
          deptCode = v.code;
          deptName = v.name;
          return true;
        }
        return false;
      });
      const obj = {};
      const items = [];
      obj.deptCode = deptCode;
      obj.deptName = deptName;
      obj.deptId = fieldsValue.deptId;
      obj.requireDate = moment().format();
      this.state.list.map((v) => {
        items.push({
          productCode: v.productCode,
          productId: v.productId,
          requireNum: parseInt(v.qty, 0),
          remark: v.remark,
        });
        return true;
      });
      obj.items = items;
      const { createCargo } = this.props.actions;
      createCargo(obj).then((res) => {
        if (res.success) {
          message.success('新增报货单成功');
          this.props.baseActions.goBack();
          // this.props.actions.tabBarDecrement(this.props.location);
          const { postNotification } = this.props.notification;
          postNotification('dataUpdate');
        } else {
          message.error(res.msg);
        }
      });
      console.log(obj);
    });
  }
  // changeFlag = () => {
  //   this.setState({ focusFlag: true });
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { depts } = this.props.uvsModel;
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
                    label="报货单状态"
                  >
                    {getFieldDecorator('requireStatus', {
                initialValue: '',
              })(
                <span>新增报货单</span>
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
              initialValue: depts && depts.length > 0 ? JSON.stringify(depts[0].id) : '',
            })(
              <Select>
                {
                  depts && depts.map(x => (
                    <Option
                      rowKey={`${x.id}`}
                      key={`${x.id}`}
                      value={`${x.id}`}
                    >{x.name}
                    </Option>
                  ))
               }
              </Select>
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

