/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateCreate/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 22nd 2017 5:32:59 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 13th 2017 10:11:17 am
 * Modified By: kongqinglei
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import moment from 'moment';
import { Table, Form, Row, Col, DatePicker, Select, Input, Icon, Button } from 'antd';
import { getCheckTypes, createOrder, getDirectAllocateDivisor } from '../../models/directAllocateC';
import EnterNext from '../../components/enter/enter';
import { SearchInput, SearchII } from '../../components/checkSearch';
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
    width: 30,
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
        // width: 100,
      }, {
        title: '名称',
        dataIndex: 'referenceType',
        key: 'referenceType',
        width: 140,
        render(text, record) {
          return (
            <div>
              <EnterNext focusFlag={target.state.focus} index={target.state.currentId} enterName={`${record.id}referenceType-enter`}>
                <SearchInput
                  providerCode={target.state.providerCode}
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
        // width: 50,
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
    title: '标准单位（税前）',
    dataIndex: 'col2',
    key: 'col2',
    children: [
      {
        title: '单位',
        dataIndex: 'unitName',
        key: 'unitName',
        width: 50,
      }, {
        title: '数量',
        dataIndex: 'qty',
        key: 'qty',
        width: 60,
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}qty-enter`}>
                <Input
                  value={text}
                  placeholder="数量"
                  disabled={target.state.disabled}
                  // onChange={(e) => {
                  //   const value = limitTowDecimals(e.target.value);
                  //   record.qty = value;

                  //   if (value && record.unitPrice) {
                  //     record.offsetAmount = fxf(value, record.unitPrice);
                  //     // 税后金额
                  //     record.amountWithtax = fxf(record.qty, record.priceWithtax);
                  //   } else if (record.unitPrice === '' || record.unitPrice === undefined || value === '' || value === undefined) {
                  //     record.offsetAmount = '';
                  //     // 税后金额
                  //     record.amountWithtax = '';
                  //   } else if (value === 0 || record.unitPrice === 0) {
                  //     record.offsetAmount = 0;
                  //     // 税后金额
                  //     record.amountWithtax = 0;
                  //   }

                  //   target.forceUpdate();
                  // }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        width: 90,
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}unitPrice-enter`}>
                <Input
                  value={text}
                  placeholder="单价"
                  disabled={target.state.disabled}
                  onChange={(e) => {
                    const value = limitTowDecimals(e.target.value);
                    record.unitPrice = value;
                    // 税后单价
                    record.priceWithtax = fxf(record.taxRate + 1, value);
                    if (value && record.qty) {
                      // 税前金额
                      record.offsetAmount = fxf(value, record.qty);
                      // 税后金额
                      record.amountWithtax = fxf(record.qty, record.priceWithtax);
                    } else if (record.qty === '' || record.qty === undefined || value === '' || value === undefined) {
                      record.offsetAmount = '';
                      // 税后金额
                      record.amountWithtax = '';
                    } else if (value === 0 || record.qty === 0) {
                      record.offsetAmount = 0;
                      // 税后金额
                     record.amountWithtax = 0;
                    }
                    target.forceUpdate();
                  }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '金额',
        dataIndex: 'offsetAmount',
        key: 'offsetAmount',
        width: 60,
      },
    ],
  }, {
    title: '辅助单位',
    dataIndex: 'col3',
    key: 'col3',
    children: [
      {
        title: '单位',
        dataIndex: 'roleName8',
        key: 'roleName8',
        width: 30,
      }, {
        title: '数量',
        dataIndex: 'roleName9',
        key: 'roleName9',
        width: 30,
      }, {
        title: '单价',
        dataIndex: 'roleName10',
        key: 'roleName10',
        width: 30,
      }, {
        title: '金额',
        dataIndex: 'roleNameq',
        key: 'roleNameq',
        width: 30,
      },
    ],
  }, {
    title: '档口',
    dataIndex: 'col4',
    key: 'col4',
    width: 50,
    children: [
      {
        title: '名称',
        dataIndex: 'dept',
        key: 'dept',
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}deptId-enter`} >
                <SearchII
                  disabled={target.state.disabled}
                  list={target.props.uvsModel.depts}
                  onSelect={(vo) => {
                    record.deptCode = vo.code;
                  }}
                />
              </EnterNext>

            </div>);
        },
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
        width: 50,
      }, {
        title: '单价',
        dataIndex: 'priceWithtax',
        key: 'priceWithtax',
        width: 50,
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
        width: 110,
        render(text, record) {
          return (
            <div>
              <DatePicker
                onChange={(dates, dateString) => {
                  record.produceDate = dateString;
                }}
                disabled={target.state.disabled}
                style={{ width: '100%' }}
                defaultValue={moment(new Date(), dateFormat)}
              />
            </div>);
        },
      }, {
        title: '批次号',
        dataIndex: 'lotId',
        key: 'lotId',
        width: 60,
        render(text, record) {
          return (
            <div>
              <EnterNext enterName={`${record.id}lotId-enter`}>
                <Input
                  disabled={target.state.disabled}
                  onChange={(e) => {
                    const { value } = e.target;
                    record.lotId = value;
                    target.forceUpdate();
                  }}
                />
              </EnterNext>
            </div>);
        },
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 60,
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
    ],
  },
];
@BaseActions
@Selecter(['directAllocateC', 'codeModel', 'uvsModel'], { getCheckTypes, createOrder, getDirectAllocateDivisor })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      columns: columns(this),
      list: [{ id: 0, produceDate: moment(new Date(), dateFormat) }],
      maxId: 0,
      providerCode: '',
    };
    this.suppliersOnSelect = this.suppliersOnSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  plus(record) {
    const list = this.state.list;
    list.some((item, index) => {
      if (item.id === record.id) {
        this.state.currentId = index + 1;

        list.splice(index + 1, 0, {
          id: this.state.maxId + 1,
          produceDate: moment(new Date(), dateFormat),
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
    const { getDirectAllocateDivisor } = this.props.actions;
    const elseProObj = value.elseProObj;
    console.log(elseProObj);

    getDirectAllocateDivisor({
      productCode: elseProObj.productCode,
      unitCode: elseProObj.unitCode,
      subUnitCode: elseProObj.subUnitCode,
    });
    record.productCode = elseProObj.productCode;
    record.productId = elseProObj.productId;
    record.productSpce = elseProObj.productSpce;
    record.unitId = elseProObj.unit.unitId;
    record.unitName = elseProObj.unit.unitName;
    record.taxRate = elseProObj.taxRate;
    record.qty = '';
    record.unitPrice = '';
    record.offsetAmount = '';
    record.priceWithtax = '';
    record.amountWithtax = '';
    this.setState({
      list: this.state.list,
    });
  }
  suppliersOnSelect(value) {
    if (this.state.providerCode !== value) {
      this.setState({
        providerCode: value,
        disabled: false,
        focus: true,
        list: [{ id: 0, produceDate: moment(new Date(), dateFormat) }],
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
        value.dircetDetails = this.state.list;
        value.instockDate = fields.instockDate.format(dateFormat);
        value.providerId = 1;
        value.instockUser = 2;
        const { createOrder } = this.props.actions;
        createOrder(value).then((res) => {
          if (res.success) {
            this.props.baseActions.linkTo('/direct-allocate-manager');
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list } = this.state;
    const { TYPE_CODE_ZBDLX } = this.props.codeModel;
    const { suppliers } = this.props.uvsModel;
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
        <Form
          className="ant-advanced-search-form"
        >
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="单据类型"
              >
                {getFieldDecorator('typeCode', {
                    rules: [
                      { required: true, message: '请选择单据类型!' },
                    ],
                  })(
                    <Select>
                      {
                        TYPE_CODE_ZBDLX.map(x => (
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
                label="制单人"
              >
                {getFieldDecorator('instockUserName', {
                    rules: [
                      { required: true, message: '请填写制单人名称!' },
                    ],
                    initialValue: userInfo.userName,
                  })(
                    <Input disabled />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="入库日期"
              >
                {getFieldDecorator('instockDate', {
                    rules: [
                      { required: true, message: '请选择入库日期!' },
                    ],
                  })(
                    <DatePicker />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="供应商"
              >
                {getFieldDecorator('providerId', {
                    rules: [
                      { required: true, message: '请选择供应商!' },
                    ],
                  })(
                    <Select
                      onSelect={this.suppliersOnSelect}
                    >
                      {
                        suppliers.map(x => (
                          <Option
                            key={x.code}
                            value={x.code}
                          >{x.name}
                          </Option>)
                    )}
                    </Select>
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
    );
  }
}

module.exports = Form.create()(View);
