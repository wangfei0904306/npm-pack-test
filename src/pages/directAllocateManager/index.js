/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/directAllocateManager/index.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 4:39:55 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 23rd 2017 4:39:55 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { Table, Form, Row, Col, DatePicker, Select, Input, Button, Modal } from 'antd';
import { queryList, getDirectAllocateTotal } from '../../models/directAllocate';
import { getCodeMapByTypeCode } from '../../models/codeModel';
import { SuplierCpt } from '../../components/conciseModal';
import typeCode from '../../api/dicApi';

import './style.less';
import { SearchInput } from './SearchInput';

const userInfo = JSON.parse(localStorage.userInfo);
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;


const columns = (target, type) => [
  {
    title: '入库单号',
    dataIndex: 'code',
    key: 'code',
    render(text) {
      return (
        <span className="table-operation" onClick={() => target.props.baseActions.linkTo(`/direct-allocate-detail?code=${text}&typeCode=${target.props.form.getFieldValue('typeCode')}`)} >{text}</span>
      );
    },
  }, {
    title: '单据类型',
    dataIndex: 'referenceType',
    key: 'referenceType',
  }, {
    title: `${type}日期`,
    dataIndex: 'stockDate',
    key: 'stockDate',
  }, {
    title: `${type}数量`,
    dataIndex: 'qty',
    key: 'qty',
  }, {
    title: `${type}额`,
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: `${type}额（含税）`,
    dataIndex: 'amountWithtax',
    key: 'amountWithtax',
  }, {
    title: '制单人',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '制单时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '供应商',
    dataIndex: 'providerName',
    key: 'providerName',
  },
];

@BaseActions
@Selecter(['directAllocate', 'codeModel', 'uvsModel'], { queryList, getCodeMapByTypeCode, getDirectAllocateTotal })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this, '入库'),
      visible: false,
      supplierItems: [],
      params: {
        pageNo: 1,
        pageSize: 10,
        deptPowerPermission: true,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    const { getCodeMapByTypeCode, getDirectAllocateTotal } = this.props.actions;
    getCodeMapByTypeCode(typeCode.TYPE_CODE_ZBDLX).then((res) => {
      this.loadData({
        typeCode: res.obj.parameterValues[0].code,
      });
      getDirectAllocateTotal({ typeCode: res.obj.parameterValues[0].code });
    });
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        fields.retailCode = userInfo.retailCode;
        fields.providerCodes = this.state.providerCodes;
        fields.userName = this.state.userName;
        this.loadData(fields);
      }
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.queryList(this.state.params).then((res) => {
      this.setState({
        columns: columns(this, res.obj.typeItem === 'NORMAL' ? '入库' : '出库'),
      });
    });
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
  // 供应商弹层
  handleOk = () => {
    this.setState({
      visible: false,
    });
    const supplierStringArr = [];
    this.state.supplierItems.map((v) => {
      supplierStringArr.push(v.providerName);
      return true;
    });
    this.setState({ supplier: supplierStringArr.join(',') });
  }
  modalOpen = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  // 供应商回调
  selectSupplierRow = (items) => {
    console.log(items);
    this.setState({
      supplierItems: items,
      providerCodes: items.map(item => item.providerCode),
    });
  }
  referenceTypeChange(value) {
    console.log(value);
    if (value) {
      this.setState({ userName: value.userName });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, totalQty, totalAmount } = this.props.directAllocate;
    const { TYPE_CODE_ZBDLX } = this.props.codeModel;
    const { supplier, supplierItems } = this.state;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="direct_allocate_view_container">
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
                  {getFieldDecorator('typeCode', {
                    initialValue: TYPE_CODE_ZBDLX[0] ? TYPE_CODE_ZBDLX[0].code : '',
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
                  label="单号"
                >
                  {getFieldDecorator('code')(
                    <Input />
                )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="制单人"
                >
                  {getFieldDecorator('userName', {
                  })(
                    <SearchInput
                      onSelect={value => this.referenceTypeChange(value)}
                      style={{ width: '100%' }}
                    />
                )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="日期"
                >
                  {getFieldDecorator('instockDate')(
                    <RangePicker style={{ width: '100%' }} />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="供应商"
                >
                  {getFieldDecorator('providerCodes')(
                    <div onClick={() => this.modalOpen('supplier')} className="search-input">
                      <Search
                        value={supplier}
                        placeholder="搜索供应商"
                        onSearch={() => this.modalOpen('supplier')}
                      />
                    </div>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="门店"
                >
                  {getFieldDecorator('retailIds', {
                    initialValue: userInfo.retailName,
                  })(
                    <Input disabled />
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
          className="view-data-table"
          dataSource={list}
          columns={this.state.columns}
          rowKey="code"
          scroll={{ x: 900 }}
          pagination={false}
          footer={() => {
            return (
              <div className="cargo-bottom">
                <span>合计</span>
                <span style={{ marginLeft: 30 }}>入库数量：{ totalQty }</span>
                <span style={{ marginLeft: 30 }}>入库额：￥{ totalAmount }</span>
              </div>);
          }}
        />
        <Modal
          title="供应商列表"
          width={800}
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={this.handleCancel}
        >
          {
            <SuplierCpt
              selectFun={items => this.selectSupplierRow(items)}
              selectedItems={supplierItems}
            />
          }
        </Modal>
      </div>
    );
  }
}

module.exports = Form.create()(View);
