import BaseActions from 'tomatobean/enhance';
import React, { Component } from 'react';
import { Form, Select, Row, Col, Button, Table, Input } from 'antd';
import { Selecter } from 'tomatobean';
import './style.less';
import { checkAny, startAny, saveAny, stopAny } from '../../models/check';
import { limitTowDecimals } from '../../util/tools';

const Option = Select.Option;
const FormItem = Form.Item;

const columns = target => [
  {
    title: '物资',
    dataIndex: 'col1',
    key: 'l1',
    children:
    [
      {
        title: '顺序号',
        dataIndex: 'seqNo',
        key: '1',
      },
      {
        title: '物资编码',
        dataIndex: 'productCode',
        key: '2',
      },
      {
        title: '物资名称',
        dataIndex: 'productName',
        key: '3',
      },
      {
        title: '规格',
        dataIndex: 'productSpec',
        key: '4',
      },
    ],
  }, {
    title: '盘点',
    dataIndex: 'col2',
    key: 'l2',
    children: [
      {
        title: '数量',
        dataIndex: 'checkQty',
        key: 'checkQty',
        render(checkQty, record) {
          return (
            <div>
              <Input
                placeholder="数量"
                onChange={(e) => {
                  console.log(e.target.value);
                  record.checkQty = limitTowDecimals(e.target.value);
                  target.forceUpdate();
                }}
                disabled={target.state.inputNum}
                style={{ width: 50 }}
                value={record.checkQty}
              />
            </div>);
        },
      },
      {
        title: '单位',
        dataIndex: 'productUnit',
        key: '5',
      },
      {
        title: '金额',
        dataIndex: 'checkAmount',
        key: '6',
      },
    ],
  }, {
    title: '在途',
    dataIndex: 'col3',
    key: 'l3',
    children: [
      {
        title: '数量',
        dataIndex: 'deliveryingQty',
        key: '7',
      },
      {
        title: '单位',
        dataIndex: 'productUnit',
        key: '8',
      },
      {
        title: '金额',
        dataIndex: 'deliveryingAmount',
        key: '9',
      },
    ],
  }, {
    title: '库存合计',
    dataIndex: 'col4',
    key: 'l4',
    children: [
      {
        title: '数量',
        dataIndex: 'invTotalQty',
        key: '10',
      },
      {
        title: '单位',
        dataIndex: 'productUnit',
        key: '11',
      },
      {
        title: '金额',
        dataIndex: 'invTotalAmount',
        key: '12',
      },
    ],
  },
];
@BaseActions
@Selecter(['checkCK', 'codeModel'], { checkAny, startAny, saveAny, stopAny })
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      edit: true,
      save: true,
      stop: true,
      checks: '',
      inputNum: true,
      checkType: false,
      ckType: false,
      checkDk: false,
      columns: columns(this),
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      checkQty: '',
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.stop = this.stop.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  // 开始盘点
  handleSearch(e) {
    this.setState({
      start: true,
      save: false,
      checkType: true,
      checkDk: true,
      inputNum: false,
      ckType: true,
    });
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      const { storages } = this.props.checkCK;
      if (!err) {
        console.log(fieldsValue);
      }
      const values = {
        storageCode: storages[0].storageCode,
        checkType: fieldsValue.checkType,
        checkDate: fieldsValue.checkDate,
      };
      this.props.actions.startAny(values);
    });
  }
  // 编辑
  edit() {
    this.setState({
      save: false,
      edit: true,
      stop: true,
      inputNum: false,
    });
  }
  // 保存
  save() {
    const { checkDate, storages, saves } = this.props.checkCK;
    console.log(saves.checkCode);
    this.setState({
      edit: false,
      save: true,
      stop: false,
      inputNum: true,
    });
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      const save = {
        checkDate,
        checkCode: saves.checkCode,
        storageCode: storages[0].storageCode,
        retailCode: storages[0].retailCode,
        checkType: fieldsValue.checkType,
        details: saves.details,
        deptCode: saves.storages[0].deptCode,
      };
      this.props.actions.saveAny(save);
    });
  }
  stop() {
    console.log(1);
    const { checkDate, storages, saves } = this.props.checkCK;
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
      const stop = {
        checkDate,
        checkCode: saves.checkCode,
        storageCode: storages[0].storageCode,
        retailCode: storages[0].retailCode,
        checkType: fieldsValue.checkType,
        details: saves.details,
        deptCode: saves.storages[0].deptCode,
      };
      this.props.actions.stopAny(stop);
    });
    this.props.baseActions.linkTo('/checkList-manager');
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.checkAny(this.state.params);
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
    const { checkDate, storages, checkCode } = this.props.checkCK;
    const { getFieldDecorator } = this.props.form;
    const storage = storages[0];
    const storageName = storage && storage.storageName;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className="checktype">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="盘点类型"
              >
                {getFieldDecorator('checkType', {
                  initialValue: 'DAILY',
              })(
                <Select style={{ width: 120 }} disabled={this.state.ckType}>
                  <Option value="DAILY">日盘</Option>
                  <Option value="WEEKLY">周盘</Option>
                  <Option value="MONTHLY">月盘</Option>
                </Select>
              )}
              </FormItem>

            </Col>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="盘点日期"
              >
                {getFieldDecorator('checkDate', {
                  initialValue: checkDate,
              })(
                <Select style={{ width: 120 }} disabled>
                  <Option value={checkDate}>{checkDate}</Option>
                </Select>

              )}
              </FormItem>
            </Col>
            <Col span={6} push={1}>
              <FormItem
                {...formItemLayout}
                label="盘点仓库"
              >
                {getFieldDecorator('storageName', {
                  initialValue: storageName,
              })(
                <Select style={{ width: 120 }} disabled={this.state.ckType}>
                  <Option value="仓库1">{storageName}</Option>
                </Select>
              )}
              </FormItem>
            </Col>
            <Col span={6} push={1}>
              <FormItem
                {...formItemLayout}
                label="盘点单号："
                hasFeedback
              >
                <div className="checkOddnum">{checkCode}</div>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="buttonStyle">
            <Col span={4}>
              <Button type="primary" onClick={this.handleSearch} disabled={this.state.start} >开始盘点</Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.edit} disabled={this.state.edit}>编辑</Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.save} disabled={this.state.save}>保存</Button>
            </Col>
            <Col span={4}>

              <Button
                type="primary"
                onClick={this.stop}
                disabled={this.state.stop}

              >
               结束盘点
              </Button>

            </Col>
          </Row>
        </Form>
        <Table
          bordered
          className="view-data-table"
          dataSource={this.props.checkCK.details}
          columns={this.state.columns}
          rowKey="checkDetailId"
          scroll={{ x: 900 }}
          pagination={false}
        />
      </div>
    );
  }
}

module.exports = Form.create()(View);
