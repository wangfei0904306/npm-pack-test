/**
 * File: d:\gsxm\CBCenter\src\pages\examineCargo\examineHave\index.js
 * Project: d:\gsxm\CBCenter
 * Created Date: Monday November 27th 2017 8:13:21 pm
 * Author: kongqinglei
 * -----
 * Last Modified:Monday December 4th 2017 1:41:59 pm
 * Modified By: kongqinglei
 * -----
 * Copyright (c) 2017 CiBei
 */

import BaseActions from 'tomatobean/enhance';
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Modal, Table, Row, Button, Col, Form, DatePicker, InputNumber } from 'antd';
import './style.less';
import { examineNullList, getDeptByUserStall, examineWithout } from '../../../models/examineCargo';


const FormItem = Form.Item;
const columns = target => [{
  title: '物资',
  dataIndex: 'kkkk',
  key: 'kkkk',
  children: [
    {
      title: '物资编码',
      dataIndex: 'productCode',
      key: 'productCode',
    }, {
      title: '物资名称',
      dataIndex: 'productName',
      key: 'productName',
    },
  ],
}, {
  title: '采购信息',
  dataIndex: 'lllll',
  key: 'lllll',
  children: [
    {
      title: '订购量',
      dataIndex: 'dsad1',
      key: 'dsad1',
    }, {
      title: '单位',
      dataIndex: 'dsda2',
      key: 'dsda2',
    }, {
      title: '采购单价',
      dataIndex: 'ewew5',
      key: 'ewew5',
    }, {
      title: '单位',
      dataIndex: 'ewew6',
      key: 'ewew6',
    },
    {
      title: '采购金额',
      dataIndex: 'ewew7e',
      key: 'ewew7e',
    },
  ],
}, {
  title: '发货信息',
  dataIndex: 'ooooo',
  key: 'ooooo',
  children: [
    {
      title: '配送量',
      dataIndex: 'receiptQty',
      key: 'receiptQty',
    }, {
      title: '单位',
      dataIndex: 'unitName',
      key: 'unitName',
    }, {
      title: '配送单价',
      dataIndex: 'deliverPrice',
      key: 'deliverPrice',
    }, {
      title: '单位',
      dataIndex: 'unitName',
      key: 'ewew11',
    },
    {
      title: '配送金额',
      dataIndex: 'receiptAmount',
      key: 'receiptAmount',
    },
  ],
}, {
  title: '入库',
  dataIndex: 'pppppp',
  key: 'pppppp',
  children: [
    {
      title: '单位',
      dataIndex: 'unitName',
      key: 'ewew13',
    },
    {
      title: '数量',
      dataIndex: 'receiptQty',
      key: 'receiptQty1',
      width: '80px',
      render: (text, record) => (
        <div>
          {
         target.state.depts.map((x, i) => (
           <div className="border"><InputNumber
             size="small"
             min={0}
             value={target.state.max}
            //  max={target.state.max}
             step={0.1}
             defaultValue={0}
             onChange={e => target.onChange(e, record.depts[i], record)}
           />
           </div>)
        )}
        </div>),
    },
    {
      title: '档口',
      dataIndex: 'deptName',

      key: 'deptName',
      render: () => (
        <div>
          {
           target.state.depts.map(x => (
             <div className="border" key={x.name}><span>{x.name}</span>
             </div>)
        )}
        </div>),
    },
  ],
},
];
@BaseActions
@Selecter(['examine'], { examineNullList, getDeptByUserStall, examineWithout })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns(this),
      queryValue: '',
      tookList: '',
      flylist: '',
      loading: false,
      depts: [],
      max: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onChange = this.onChange.bind(this);
    this.UserStallData = this.UserStallData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.WithoutData = this.WithoutData.bind(this);
  }
  componentDidMount() {
    const queryList = this.props.location.query;
    this.loadData(queryList).then((res) => {
      const tookList = res.obj.receiptList;
      this.setState({
        tookList,
      });
      this.UserStallData().then((res) => {
        const depts = res.obj;
        this.setState({
          depts,
        });
        console.log(this.state.depts);
        for (let i = 0; i < tookList.length; i++) {
          const item = tookList[i];
          const newDepts = [];
          for (let k = 0; k < depts.length; ++k) {
            const dept = depts[k];
            newDepts.push({
              deptCode: dept.code,
              deptId: dept.id,
              itemId: item.id,
              qty: 0,
            });
          }
          this.state.tookList[i].depts = newDepts;
        }
        console.log(this.state.tookList);
      });
    });
  }


  onChange(e, dept, record) {
    const { value } = e.target;
    if (value !== '' || value !== undefined) {
      dept.qty = value;
    } else {
      dept.qty = 0;
    }
    // console.log(record);
    if (value > record.receiptQty) {
      value = record.receiptQty;
    } else {
      let sun = 0;
      const maxList = record.depts;
      for (let i = 0; i < maxList.length; i++) {
        sun += maxList[i].qty;
      }
      let max = 0;
      if (sun < record.receiptQty) {
        max = record.receiptQty - sun;
        this.setState({
          max,
        });
      } else {
        max = 0;
        this.setState({
          max,
        });
      }
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.WithoutData(this.state.flylist);
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  // 提交表单
  handleSearch(e) {
    e.preventDefault();
    const tylood = [];
    for (let i = 0; i < this.state.tookList.length; i++) {
      for (let j = 0; j < this.state.tookList[i].depts.length; j++) {
        tylood.push(this.state.tookList[i].depts[j]);
      }
    }
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err && fields.time !== undefined) {
        const time = fields.time.format('YYYY-MM-DD hh:mm:ss');
        const queryId = this.props.location.query;
        const queryValue = {
          deptOrderId: queryId.orderCode,
          instockDate: time,
        };
        this.setState({
          queryValue,
        });
        if (queryValue.deptOrderId !== undefined) {
          this.showModal();
        }
      } else {
        const modal = Modal.error({
          title: '请选择时间',
          content: '1秒后将自动关闭',
        });
        setTimeout(() => modal.destroy(), 1000);
      }
    });
    const flylist = {
      itemList: tylood,
      orderReceiptId: this.props.examine.NullList.receiptId,
      instockTime: this.state.queryValue.instockDate,
    };
    this.setState({
      flylist,
    });
  }


  // 请求物资数据
  loadData(params) {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
    const { actions } = this.props;
    return actions.examineNullList(params);
  }

  // 档口请求
  UserStallData(params) {
    const { actions } = this.props;
    return actions.getDeptByUserStall(params);
  }


  // 验货入库
  WithoutData(params) {
    const { actions } = this.props;
    return actions.examineWithout(params);
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <div className="examineHave">
        <div className="examineHave_main">
          <Form onSubmit={this.handleSearch}>
            <Row type="flex" align="middle" className="row-top">
              <Col span={3} push={1} >报货单号 :无 </Col>
              <Col span={3} push={1}>报货时间 : 无</Col>
              <Col span={3} push={1}>制单人 : 无</Col>
              <Col span={3} push={1}>门店 : {JSON.parse(localStorage.getItem('userInfo')).retailName}</Col>
              <Col span={6} className="datepiker">
                <FormItem
                  {...formItemLayout}
                  label="入库时间"
                >
                  {getFieldDecorator('time')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
                </FormItem>
              </Col>
            </Row>
            <Table
              loading={this.state.loading}
              rowKey="id"
              bordered
              className="view-data-table"
              dataSource={this.props.examine.NullList.receiptList}
              columns={this.state.columns}
            />
            <Row style={{ marginTop: 20 }} className="insert" type="flex" align="middle">
              <Col className="insertOne" span={2} push={3}>合计</Col>
              <Col span={2} push={3}>采购数量 : 无 </Col>
              <Col span={3} push={3}>采购含税金额 : 无</Col>
              <Col span={2} push={5}>配送数量 : {this.props.examine.NullList.receiptQtyNum}</Col>
              <Col span={3} push={6}>配送含税金额 : {this.props.examine.NullList.receiptAmountNum}</Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={12} push={2} style={{ textAlign: 'center' }} pull={1}>
                <Button className="operation-btn1" type="primary" onClick={this.props.baseActions.goBack} >关闭</Button>
              </Col>
              <Col span={6} pull={3} style={{ textAlign: 'center' }}>
                <Button className="operation-btn2" type="primary" htmlType="submit" >验货入库</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Modal
          visible={this.state.visible}
          title="提示"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>返回</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <p>请确认入库时间以及分配数量</p>
          <p>{this.state.queryValue.instockDate}</p>
        </Modal>
      </div>
    );
  }
}
module.exports = Form.create()(View);
