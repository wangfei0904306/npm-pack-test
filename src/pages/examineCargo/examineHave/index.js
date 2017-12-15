/**
 * File: d:\gsxm\CBCenter\src\pages\examineCargo\examineHave\index.js
 * Project: d:\gsxm\CBCenter
 * Created Date: Monday November 27th 2017 8:13:21 pm
 * Author: kongqinglei
 * -----
 * Last Modified:Saturday December 9th 2017 5:03:45 pm
 * Modified By: kongqinglei
 * -----
 * Copyright (c) 2017 CiBei
 */
import BaseActions from 'tomatobean/enhance';
import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import { Modal, Table, Row, Button, Col, Select, Form, DatePicker } from 'antd';
import './style.less';
import { examineHaveList, examineSingle } from '../../../models/examineCargo';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = target => [{
  title: '物资',
  dataIndex: 'wuzi',
  key: 'wuzi',
  children: [
    {
      title: '物资编码',
      dataIndex: 'productCode',
      key: 'productCode',
    }, {
      title: '物资名称',
      dataIndex: 'deliverName',
      key: 'deliverName',
    },
  ],
}, {
  title: '采购信息',
  dataIndex: 'caigou',
  key: 'caigou',
  children: [
    {
      title: '订购量',
      dataIndex: 'requireQty',
      key: 'requireQty',
    }, {
      title: '单位',
      dataIndex: 'requireQtyUnitName',
      key: 'requireQtyUnitName',
    }, {
      title: '采购单价',
      dataIndex: 'proUnitPrice',
      key: 'proUnitPrice',
    }, {
      title: '单位',
      dataIndex: 'unitPriceUnitName',
      key: 'unitPriceUnitName',
    },
    {
      title: '采购金额',
      dataIndex: 'requireAmount',
      key: 'requireAmount',
    },
  ],
}, {
  title: '发货信息',
  dataIndex: 'fahuo',
  key: 'fahuo',
  children: [
    {
      title: '配送量',
      dataIndex: 'deliverQty',
      key: 'deliverQty',
    }, {
      title: '单位',
      dataIndex: 'requireQtyUnitName',
      key: 'requireQtyUnitName1',
    }, {
      title: '配送单价',
      dataIndex: 'deliverUnitPrice',
      key: 'deliverUnitPrice',
    }, {
      title: '单位',
      dataIndex: 'unitPriceUnitName',
      key: 'unitPriceUnitName1',
    },
    {
      title: '配送金额',
      dataIndex: 'deliverAmount',
      key: 'deliverAmount',
    },
  ],
}, {
  title: '入库',
  dataIndex: 'ruku',
  key: 'ruku',
  children: [
    {
      title: '单位',
      dataIndex: 'requireQtyUnitName',
      key: 'requireQtyUnitName11',
    },
    {
      title: '数量',
      dataIndex: 'requireQty',
      key: 'requireQty1',
    },
    {
      title: '档口',
      dataIndex: 'deptName',
      key: 'deptName',
    },
  ],
},
];


@BaseActions
@Selecter(['examine'], { examineHaveList, examineSingle })
class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      columns: columns(this),
      queryValue: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.loadData = this.loadData.bind(this);
    this.referData = this.referData.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.requireStatus = this.requireStatus.bind(this);
  }


  componentDidMount() {
    const queryList = this.props.location.query;
    console.log(queryList);
    this.loadData(queryList);
  }
  changeClass(record) {
    if (record.requireQty !== record.deliverQty || record.requireAmount !== record.deliverAmount) {
      return 'pinkclass';
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.referData(this.state.queryValue);
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }


  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err && fields.time !== undefined) {
        const time = fields.time.format('YYYY-MM-DD hh:mm:ss');
        const queryId = this.props.location.query;
        const queryValue = {
          deptOrderId: queryId.id,
          instockDate: time,
        };
        this.setState({
          queryValue,
        });
        if (this.state.queryValue.deptOrderId !== undefined) {
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
  }

  requireStatus(value) {
    const tips = {
      value,
      id: this.props.location.query.id,
    };
    this.loadData(tips);
  }

  loadData(params) {
    const { actions } = this.props;
    actions.examineHaveList(params);
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  referData(params) {
    const { actions } = this.props;
    actions.examineSingle(params);
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
              <Col span={4} push={1}>报&nbsp;货&nbsp;单&nbsp;号 : {this.props.examine.HaveList.code}</Col>
              <Col span={4} push={1}>报&nbsp;货&nbsp;时&nbsp;间 : {this.props.examine.HaveList.requireDate}</Col>
              <Col span={2} push={1}>制&nbsp;单&nbsp;人 : {this.props.examine.HaveList.createByName}</Col>
              <Col span={2} push={1}>门&nbsp;店 : {JSON.parse(localStorage.getItem('userInfo')).retailName}</Col>
              <Col span={4} push={1} className="datepiker">
                <FormItem
                  {...formItemLayout}
                  label="配&nbsp;&nbsp;&nbsp;送&nbsp;&nbsp;&nbsp;商"
                >
                  {getFieldDecorator('requireStatus', {
                         initialValue: 'q',
                  })(
                    <Select notFoundContent="无配送商" onSelect={this.requireStatus}>
                      <Option key="10000" value="q">全部</Option>
                      {
                        this.props.examine.HaveList.proList.map(x => (
                          <Option
                            rowKey={x.proId}
                            key={x.proId}
                            value={x.proId}
                          >{x.proName}
                          </Option>)
                      )}
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={4} push={1} className="datepiker">
                <FormItem
                  {...formItemLayout}
                  label="入&nbsp;库&nbsp;时&nbsp;间"
                >
                  {getFieldDecorator('time')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
                </FormItem>
              </Col>
            </Row>

            <Table

              loading={this.state.loading}
              bordered
              className="view-data-table"
              dataSource={this.props.examine.HaveList.detailList}
              columns={this.state.columns}
              rowKey="id"
              rowClassName={this.changeClass}
            />
            <Row style={{ marginTop: 20 }} className="insert" type="flex" align="middle">
              <Col className="insertOne" span={2} push={3}>合计</Col>
              <Col span={2} push={3}>采购数量 : {this.props.examine.HaveList.deliverQtyNum}</Col>
              <Col span={2} push={3}>采购含税金额 : {this.props.examine.HaveList.deliverAmountNum}</Col>
              <Col span={2} push={5}>配送数量 : {this.props.examine.HaveList.requireQtyNum}</Col>
              <Col span={2} push={5}>配送含税金额 : {this.props.examine.HaveList.requireAmountNum}</Col>
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
          <p>请确认入库时间</p>
          <p>{this.state.queryValue.instockDate}</p>
        </Modal>
      </div>
    );
  }
}

module.exports = Form.create()(View);
