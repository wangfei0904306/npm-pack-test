/**
 * File: d:\gsxm\CBCenter\src\pages\examineCargo\index.js
 * Project: d:\gsxm\CBCenter
 * Created Date: Friday November 24th 2017 10:20:01 am
 * Author: kongqinglei
 * -----
 * Last Modified:Monday December 4th 2017 6:07:25 pm
 * Modified By: kongqinglei
 * -----
 * Copyright (c) 2017 CiBei
 */
import BaseActions from 'tomatobean/enhance';
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Modal, Table, Row, Button, Col, Input, Select, Form, DatePicker } from 'antd';
import './style.less';
import { examineList, examineMoreCargo, examineUserStore, getDeptByUserStall } from '../../models/examineCargo';


const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const columns = target => [{
  title: '报货单号',
  dataIndex: 'code',
  key: 'code',
  render: (text, record) => (
    <a
      key="sasako"
      onClick={() => {
      target.props.baseActions.linkTo(`/examine-have?id=${record.id}`);
    }
  }
    >{text}
    </a>),
}, {
  title: '报货日期',
  dataIndex: 'requireDate',
  key: 'requireDate',
}, {
  title: '凭证号',
  dataIndex: 'orderCode',
  key: 'orderCode',
  render: (text, record) => (
    <a
      key="sjajij"
      onClick={() => {
      if (record.code === '') {
        target.props.baseActions.linkTo(`/examine-null?orderCode=${record.orderCode}`);
      } else {
        target.props.baseActions.linkTo(`/examine-have?id=${record.id}`);
      }
    }
  }
    >{text}
    </a>),
}, {
  title: '档口',
  dataIndex: 'deptName',
  key: 'deptName',
}, {
  title: '状态',
  dataIndex: 'requireStatusName',
  key: 'requireStatusName',
}, {
  title: '发货单号',
  dataIndex: 'deliverCode',
  key: 'deliverCode',
}, {
  title: '发货时间',
  dataIndex: 'deliverTime',
  key: 'deliverTime',
}, {
  title: '报货数量',
  dataIndex: 'requireQty',
  key: 'requireQty',
}, {
  title: '发货数量',
  dataIndex: 'deliverQty',
  key: 'deliverQty',
}, {
  title: '差额',
  dataIndex: 'balance',
  key: 'balance',
}, {
  title: '报货额',
  dataIndex: 'requireAmount',
  key: 'requireAmount',
}, {
  title: '发货额',
  dataIndex: 'deliverAmount',
  key: 'deliverAmount',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',

}];


@BaseActions
@Selecter(['examine'], { examineList, examineMoreCargo, examineUserStore, getDeptByUserStall })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      columns: columns(this),
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      more: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadData = this.loadData.bind(this);
    this.createSearch = this.createSearch.bind(this);
    this.UserStore = this.UserStore.bind(this);
    this.UserStall = this.UserStall.bind(this);
  }
  componentDidMount() {
    this.loadData();
    this.UserStore();
    console.log(this.props.examine.store);
    this.UserStall();
    console.log(this.props.examine.stall);
  }
  componentWillUnmount() {
  }
  onChange(date, dateString) {
  }
  // 多选框
  onSelectChange = (selectedRowKeys, selectedRows) => {
    const morelist = [];
    if (selectedRows !== undefined) {
      for (let i = 0; i < selectedRows.length; i++) {
        morelist.push(selectedRows[i].id);
      }
      this.setState({
        more: morelist,
      });
    }
    this.setState({ selectedRowKeys });
  }
  // 查询
  handleSearch(e) {
    e.preventDefault();
    const modal = Modal.success({
      title: '查询成功',
      content: '1秒后将自动关闭',
    });
    setTimeout(() => modal.destroy(), 1000);
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        if (fields.requireDate !== undefined) {
          const requireDateStart = fields.requireDate[0].format('YYYY-MM-DD hh:mm:ss');
          const requireDateEnd = fields.requireDate[1].format('YYYY-MM-DD hh:mm:ss');
          fields.requireDateStart = requireDateStart;
          fields.requireDateEnd = requireDateEnd;
          delete fields.requireDate;
        }
        this.loadData(fields);
      }
    });
  }
  // 改变行内颜色
  changeClass(record) {
    if (record.requireQty !== record.deliverQty || record.requireAmount !== record.deliverAmount) {
      return 'pinkclass';
    }
  }
  // 根据用户权限获取档口
  UserStall() {
    const { actions } = this.props;
    actions.getDeptByUserStall();
  }
  moreCargo() {
    const { actions } = this.props;
    return actions.examineMoreCargo(this.state.more);
  }
  // 根据用户权限获取门店
  UserStore() {
    const { actions } = this.props;
    actions.examineUserStore();
  }
  // 列表数据请求
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.examineList(this.state.params);
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }
  // 参数改变
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
  // 验货
  createSearch= () => {
    this.setState({ loading: true });
    this.moreCargo();
    const modal = Modal.success({
      title: '验货成功',
      content: '1秒后将自动关闭',
    });
    setTimeout(() => modal.destroy(), 2000);
    setTimeout(() => {
      this.loadData();
      this.setState({
        selectedRowKeys: [],
        loading: false,
        more: [],
      });
    }, 3000);
  }
  render() {
    const { total, list } = this.props.examine;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="examineCargo">
        <div className="examineCargo_main">
          <Form onSubmit={this.handleSearch}>
            <Row>
              <Col span={5}>
                <FormItem
                  {...formItemLayout}
                  label="门 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店"
                >
                  {getFieldDecorator('orgCode', {

                  })(
                    <Select placeholder="请选择门店">
                      {
                        this.props.examine.store.map(x => (
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
              <Col span={5} push={2}>
                <FormItem
                  {...formItemLayout}
                  label="档 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口"
                >
                  {getFieldDecorator('deptCode', {
                      initialValue: '',
                  })(
                    <Select placeholder="请选择档口" >
                      <Option rowKey="a223" key="a223" value="">全部</Option>
                      {
                        this.props.examine.depts.map(x => (
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
              <Col span={6} push={3}>
                <FormItem
                  {...formItemLayout}
                  label="报货时间"
                >
                  {getFieldDecorator('requireDate')(
                    <RangePicker
                      showTime
                      format="YYYY-MM-DD"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>

              <Col span={5}>
                <FormItem
                  {...formItemLayout}
                  label="报货单号"
                >
                  {getFieldDecorator('code')(
                    <Input placeholder="" />
                  )}
                </FormItem>
              </Col>
              <Col span={5} push={2}>
                <FormItem
                  {...formItemLayout}
                  label="报货单状态"

                >
                  {getFieldDecorator('requireStatus', {
                     initialValue: '',
                  })(
                    <Select placeholder="状态">
                      <Option key="s10" value="">全部</Option>
                      <Option key="s11" value="6WAIT_RECEIVE">待收获</Option>
                      <Option key="s12" value="7INSPECTED">已验货</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>

            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={12} push={2} style={{ textAlign: 'center' }} pull={1}>
                <Button className="operation-btn1" type="primary" htmlType="submit">查询</Button>
              </Col>
              <Col span={6} pull={3} style={{ textAlign: 'center' }}>
                <Button
                  className="operation-btn2"
                  type="primary"
                  onClick={this.createSearch}
                  disabled={!hasSelected}
                  loading={loading}
                >验货
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Table
                  loading={this.state.loading}
                  bordered
                  dataSource={list.rows}
                  rowClassName={this.changeClass}
                  rowSelection={rowSelection}
                  columns={this.state.columns}
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
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} className="insert" type="flex" align="middle">
              <Col className="insertOne" span={2} push={3}>合计</Col>
              <Col span={3} push={3}>发货数量 :{list.totalQty} </Col>

              <Col span={3} push={3}>发货额 :{list.totalPrice} </Col>
            </Row>
          </Form>
        </div>

      </div>
    );
  }
}
module.exports = Form.create()(View);
