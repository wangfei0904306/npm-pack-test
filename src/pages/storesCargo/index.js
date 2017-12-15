/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/pages/storesCargo/index.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Saturday November 18th 2017 4:38:40 pm
 * Author: youngcao
 * -----
 * Last Modified:Friday December 8th 2017 7:28:24 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions, { Notification } from 'tomatobean/enhance';
import { Row, DatePicker, Col, Button, Select, Form, Table } from 'antd';
import { queryList, getDeptListByUser } from '../../models/cargo';
import { getCodeMapByTypeCode } from '../../models/codeModel';
import { getDeptByUserStall } from '../../models/uvsModel';
import './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const columns = target => [
  {
    title: '报货单号',
    dataIndex: 'code',
    key: 'code',
    render: ((text, render) => {
      return <span onClick={() => target.goDetail(render.id)} style={{ color: '#49a9ee', cursor: 'pointer' }} >{text}</span>;
    }),
  }, {
    title: '报货时间',
    dataIndex: 'requireDate',
    key: 'requireDate',
  }, {
    title: '报货数量',
    dataIndex: 'requireQty',
    key: 'requireQty',
    width: 100,
    render: text => (
      text
    ),
  }, {
    title: '报货金额',
    dataIndex: 'requireAmount',
    key: 'requireAmount',
  }, {
    title: '档口编码',
    dataIndex: 'deptCode',
    key: 'deptCode',
  }, {
    title: '档口名称',
    dataIndex: 'deptName',
    key: 'deptName',
  }, {
    title: '制单人',
    dataIndex: 'createByName',
    key: 'createByName',
  }, {
    title: '报货单状态',
    dataIndex: 'requireStatusName',
    key: 'requireStatusName',
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: ((text, render) => render.requireStatus === '2WAIT_SUBMIT' && <span onClick={() => target.goDetailModify(render.id)} style={{ color: '#49a9ee', cursor: 'pointer' }}>编辑</span>),
  },
];
// 1SHOP_VERIFY_REJECTE
@Notification
@BaseActions
@Selecter(['cargo', 'codeModel', 'uvsModel'], { queryList, getDeptListByUser, getCodeMapByTypeCode, getDeptByUserStall })
class CargoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.createCargo = this.createCargo.bind(this);
    this.goDetail = this.goDetail.bind(this);
  }
  componentDidMount() {
    const { getCodeMapByTypeCode, getDeptByUserStall } = this.props.actions;
    // const { storages } = this.props.uvsModel;
    getCodeMapByTypeCode();
    getDeptByUserStall().then((res) => {
      this.loadData({ deptId: res.obj[0].id });
    });
    const { observer } = this.props.notification;
    observer('dataUpdate', () => {
      getDeptByUserStall().then((res) => {
        this.loadData({ deptId: res.obj[0].id });
      });
    });
  }
  componentWillUnmount() {
    const { removeObserver } = this.props.notification;
    removeObserver('dataUpdate');
  }
  onChange() {
  }
  createCargo() {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/storesCargo/add' });
  }
  goDetail(id) {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/storesCargo/detail', query: { id } });
  }
  goDetailModify(id) {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/storesCargo/detailModify', query: { id } });
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      // const { depts } = this.props.uvsModel;
      // const reg = /^[\u4E00-\u9FA5]+$/;
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        deptId: parseInt(fieldsValue.deptId, 0),
        requireStatus: fieldsValue.requireStatus,
        requireDateStart: rangeValue && rangeValue[0].format('YYYY-MM-DD'),
        requireDateEnd: rangeValue && rangeValue[1].format('YYYY-MM-DD'),
      };
      this.loadData(values);
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.queryList(this.state.params);
  }
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
  render() {
    const { list, total, loading, totalPrice, totalQty } = this.props.cargo;
    const { depts } = this.props.uvsModel;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div className="stores-cargo-page" >
        <div className="search-query">
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="申请时间"
                >
                  {getFieldDecorator('range-picker', {
            initialValue: '',
          })(
            <RangePicker
              format="YYYY-MM-DD"
              onChange={this.onChange}
            />
          )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="档口"
                >
                  {getFieldDecorator('deptId', {
          initialValue: depts && depts.length > 0 ? JSON.stringify(depts[0].id) : '',
        })(
          <Select >
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
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="报货单状态"
                >
                  {getFieldDecorator('requireStatus', {
                initialValue: '',
              })(
                <Select >
                  <Option
                    key=""
                    value=""
                  >全部
                  </Option>
                  {
                  this.props.codeModel.TYPE_CODE_BHDZT && this.props.codeModel.TYPE_CODE_BHDZT.map(x => (
                    <Option
                      rowKey={`${x.id}`}
                      key={`${x.id}`}
                      value={`${x.code}`}
                    >{x.value}
                    </Option>
                  ))
               }
                </Select>
            )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button className="operation-button" type="primary" htmlType="submit" >查询</Button>
                <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={this.createCargo}>新增</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          footer={() => {
            return (
              <div className="cargo-bottom">
                <span>合计</span>
                <span style={{ marginLeft: 30 }}>订购数量：{totalQty}</span>
                <span style={{ marginLeft: 30 }}>采购金额：￥{totalPrice}</span>
              </div>);
          }}
          bordered
          loading={loading}
          className="view-data-table"
          dataSource={list}
          columns={this.state.columns}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={{
                    total,
                    current: this.state.params.pageNo,
                    showSizeChanger: true,
                    pageSize: this.state.params.pageSize,
                    onChange: (pageNo) => {
                      this.loadData({ pageNo });
                    },
                    onShowSizeChange: (pageNo, pageSize) => {
                      this.loadData({ pageNo, pageSize });
                    },
                  }}
        />

      </div>
    );
  }
}

module.exports = Form.create()(CargoList);

